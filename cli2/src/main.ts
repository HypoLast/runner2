import { TemplateRoom } from "./TemplateRoom";

let req = new XMLHttpRequest();
req.open("GET", "/templates.json");
req.addEventListener("load", function(e) {
    let templates: TemplateRoom[] = JSON.parse(this.responseText).map( (d: number[][]) => new TemplateRoom(d) );
    templates.forEach( (t) => console.log(t.toString()) );
} );
req.send();