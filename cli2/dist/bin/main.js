define(["require", "exports", "./TemplateRoom"], function (require, exports, TemplateRoom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var req = new XMLHttpRequest();
    req.open("GET", "/templates.json");
    req.addEventListener("load", function (e) {
        var templates = JSON.parse(this.responseText).map(function (d) { return new TemplateRoom_1.TemplateRoom(d); });
        templates.forEach(function (t) { return console.log(t.toString()); });
    });
    req.send();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNuQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBYSxJQUFLLE9BQUEsSUFBSSwyQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFFLENBQUM7UUFDNUcsU0FBUyxDQUFDLE9BQU8sQ0FBRSxVQUFDLENBQUMsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQXpCLENBQXlCLENBQUUsQ0FBQztJQUMxRCxDQUFDLENBQUUsQ0FBQztJQUNKLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUm9vbSB9IGZyb20gXCIuL1RlbXBsYXRlUm9vbVwiO1xyXG5cclxubGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5yZXEub3BlbihcIkdFVFwiLCBcIi90ZW1wbGF0ZXMuanNvblwiKTtcclxucmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGxldCB0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCkubWFwKCAoZDogbnVtYmVyW11bXSkgPT4gbmV3IFRlbXBsYXRlUm9vbShkKSApO1xyXG4gICAgdGVtcGxhdGVzLmZvckVhY2goICh0KSA9PiBjb25zb2xlLmxvZyh0LnRvU3RyaW5nKCkpICk7XHJcbn0gKTtcclxucmVxLnNlbmQoKTsiXX0=