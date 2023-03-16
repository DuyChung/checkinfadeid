export default class shifts {
    name;
    working_day;
    time_start;
    time_end;
    date_in_week;
    company_id;
    shifts_code;
    constructor(data)
    {
        this.name =data.name ||'';
        this.working_day = data.working_day ||0;
        this.time_start = data.time_start || '';
        this.time_end=data.time_end ||'';
        this.date_in_week=data.date_in_week ||[];
        this.company_id=data.company_id ||'';
        this.shifts_code=data.shifts_code ||'';
    }
}