export class CreateEventDto {
    service: string;
    action: string;
    date: Date;
    changes: {
        [key: string]: any;
    }
}
