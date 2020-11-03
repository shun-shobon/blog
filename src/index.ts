import { h } from "preact";
import render from "preact-render-to-string";
import Hello from "./hello";

console.log(render(h(Hello, { name: "world!" })));
