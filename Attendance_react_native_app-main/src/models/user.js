export default class user {
    name;
    face_data;
    user_id;
    company_id;
    root;
    room;
    phone;
    day_of_birth;
    password;
    department_id;
    avatar;
    constructor(data)
    {
        this.name =data.name ||'';
        this.face_data = data.face_data ||{};
        this.user_id = data.phone || '';
        this.company_id=data.company_name ||'';
        this.root=data.root ||false;
        this.room=data.room ||'';
        this.day_of_birth=data.birdthDay ||'';
        this.password=data.password ||'';
        this.phone=data.phone ||'';
        this.department_id=data.department_id ||null;
        this.avatar=data.avatar ||'';
    }
}