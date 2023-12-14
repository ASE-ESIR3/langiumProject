
export class MyError {
    public line: number;
    public message: string;
    public text: string;
    constructor(line: number, message: string, text: string) {
        this.line = line;
        this.message = message;
        this.text = text;
    }
}

