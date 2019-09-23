
export class UserNotifications {
    constructor(
        public id?: number,
        public id_job_application?: number,
        public is_read?: string,
        public idUser?: number,
        public notification_templatesId?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public notificationData?: string,
        public notificationSubject?: string,
        public notificationTemplate?: string,
        public notificationAction?: string,
        public notificationActionName?: string

    ) {
        if(!this.is_read) {
            this.is_read = 'F';
        }
    }
}
