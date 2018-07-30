export  class  notification {
    private sender:number;
    private receiver:number;
    private des:string;
    private path:string;
    private status:false;
    constructor(sender,receiver,des,path,status){
        this.sender=sender;
        this.receiver=receiver;
        this.des=des;
        this.path=path;
        this.status=status;
    }

}
export default notification;