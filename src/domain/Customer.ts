class Customer {
    id?: number
    name: string    
    cpf: string
    email?: string
    phone?: string
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}

export { Customer }