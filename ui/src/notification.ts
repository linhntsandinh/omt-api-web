export  class  notification {
    private sender:number;
    private receiver:number;
    private des:string;
    private path:string;
    constructor(sender,receiver,des,path){
        this.sender=sender;
        this.receiver=receiver;
        this.des=des;
        this.path=path;
    }

}
export default notification;