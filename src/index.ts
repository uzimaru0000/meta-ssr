import {
    BuildOptions,
    download,
    glob,
    createLambda,
    shouldServe,
    AnalyzeOptions,
    FileFsRef
} from '@vercel/build-utils'
import { join, extname, basename } from 'path'
import compiler from './compiler';

export const version = 3

export { shouldServe }

export function analyze({ files, entrypoint }: AnalyzeOptions) {
	return files[entrypoint].digest;
}

export const build = async ({
    workPath,
    files,
    entrypoint,
    meta = {},
    config = {}
}: BuildOptions) => {
    const devCacheDir = join(workPath, '.vercel', 'cache')
    const distPath = join(devCacheDir, 'tsx')

    await download(files, workPath, meta);

    const filePath = files[entrypoint]
    if (filePath.fsPath && checkExt(filePath.fsPath, /\.tsx/)) {
        compiler(distPath, [filePath.fsPath])
    }

    const output = await createLambda({
        runtime: 'nodejs12.x',
        handler: 'runtime.handler',
        files: {
            'runtime.js': new FileFsRef({
                fsPath: join(workPath, 'dist', 'runtime.js')
            }),
            ...(await glob("**", distPath))
        },
        environment: {
            ENTRY_POINT: `${basename(entrypoint, '.tsx')}.js`
        }
    })

	return { output };
}

const checkExt = (file: string, reg: RegExp) => {
    const ext = extname(file)
    return reg.test(ext)
}
