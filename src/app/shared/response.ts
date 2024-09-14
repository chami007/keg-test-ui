export class Response<T> {
    constructor(
        public data: T,
        public totalItems: number,
        public message: string
    ) { }
}