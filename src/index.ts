import { Elm } from './Elm/Main.elm';

const mount = document.querySelector('main');
Elm.Main.init({ node: mount });
