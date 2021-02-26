export class work {
    name: string;
    text: String;
    tags: string[];
    link :string;
    hostlink :string;
    constructor(name: string,text:string, tags: string[],link:string,hostlink:string) {
        this.name = name;        
        this.text = text;        
        this.tags = tags;
        this.link = link;
        this.hostlink = hostlink;
      }
}
