export type ListenerCb<T> = (output: T) => void;
export type ListenerCbMap<T> = Record<string, ListenerCb<T>[]>;

export enum MessageType {
    waitForInput="waitForInput"
}

abstract class BaseWebTransporter<Input, Output> {
    protected abstract cbs: ListenerCbMap<Input>;
    abstract send(data: Input): Promise<Output>;
    abstract listener(type: MessageType, handle: (output: Output)=>void): void;
}


export type BaseInputStruct = any;
export type BaseOutputStruct = any;

export class WebTransporter<Input extends BaseInputStruct, Output extends BaseOutputStruct> extends BaseWebTransporter<BaseInputStruct, BaseOutputStruct>{

    constructor(private targetUrl: string) {
        super();
    }

    protected cbs: ListenerCbMap<BaseOutputStruct> = {};

    listener(type: MessageType, handle: (output: BaseOutputStruct) => void): void {
        this.cbs[type] = (this.cbs[type]||[]).concat([handle]);
    }

    async send(data: BaseInputStruct): Promise<BaseOutputStruct> {
        return {
            data: {
                content: data.data
            }
        };
    }


}