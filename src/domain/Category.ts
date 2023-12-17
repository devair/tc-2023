class Category {
    id?: number
    name: string    
    description: string
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}
export { Category }