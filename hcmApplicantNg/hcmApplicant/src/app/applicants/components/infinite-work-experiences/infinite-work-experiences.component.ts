import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AtApplicantsExperience} from '../../models/applicant-experience.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-infinite-work-experiences',
    templateUrl: './infinite-work-experiences.component.html',
    styleUrls: ['./infinite-work-experiences.component.css']
})
export class InfiniteWorkExperiencesComponent implements OnInit {

    @Output() messageEvent = new EventEmitter<AtApplicantsExperience[]>();
    @Output() hasWorkExperienceEvent = new EventEmitter<boolean>();

    hasWorkExperience = false;
    workExperiences: AtApplicantsExperience[] = [];

    daniArray: number[] = [];
    mjeseciArray: number[] = [];
    godineArray: number[] = [];

    dateFromTempYear: [] = [];
    dateFromTempMonth: [] = [];
    dateFromTempDay: [] = [];

    dateToTempYear: [] = [];
    dateToTempMonth: [] = [];
    dateToTempDay: [] = [];

    constructor() {
        for (let i = 1; i < 32; i++) {
            this.daniArray.push(i);
        }
        for (let i = 1; i < 13; i++) {
            this.mjeseciArray.push(i);
        }
        for (let i = new Date().getFullYear() + 1; i > 1900; i--) {
            this.godineArray.push(i);
        }
        this.workExperiences.push(new AtApplicantsExperience());
    }

    ngOnInit() {
    }

    private showSwalert(message: string, type: string, title?: string) {
        Swal.fire({
            title: title ? title : type === 'error' ? 'Greška' : 'Uspjeh',
            text: message,
            type: type === 'error' ? 'error' : 'success',
        });
    }

    private isLastAddedWorkExperienceValid(): boolean {
        const we = this.workExperiences[this.workExperiences.length - 1];
        if (!we.dateFrom || !we.position) {
            this.showSwalert('Pozicija i datum od su obavezni.', 'error');
            return false;
        }
        return true;
    }

    onYearChange(i: number) {
        /*
        console.log("---------------------");
        console.log("i: ");
        console.log(i);
        console.log("work experiences: ")
        console.log(this.workExperiences[i]);
        console.log("TEMP: ")
        console.log(this.dateFromTempDay[i]);
        console.log(this.dateFromTempMonth[i]);
        console.log(this.dateFromTempYear[i]);
        console.log("---------------------");
         */

        if (this.workExperiences[i]) {
            if (this.dateFromTempDay[i] && this.dateFromTempMonth[i] && this.dateFromTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateFromTempYear[i], this.dateFromTempMonth[i] - 1, this.dateFromTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateFrom = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateFrom = null;
            }
            if (this.dateToTempDay[i] && this.dateToTempMonth[i] && this.dateToTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateToTempYear[i], this.dateToTempMonth[i] - 1, this.dateToTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateTo = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateTo = null;
            }
        }
    }

    onMonthChange(i: number) {
        if (this.workExperiences[i]) {
            if (this.dateFromTempDay[i] && this.dateFromTempMonth[i] && this.dateFromTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateFromTempYear[i], this.dateFromTempMonth[i] - 1, this.dateFromTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateFrom = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateFrom = null;
            }
            if (this.dateToTempDay[i] && this.dateToTempMonth[i] && this.dateToTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateToTempYear[i], this.dateToTempMonth[i] - 1, this.dateToTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateTo = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateTo = null;
            }
        }
    }

    onDayChange(i: number) {
        if (this.workExperiences[i]) {
            if (this.dateFromTempDay[i] && this.dateFromTempMonth[i] && this.dateFromTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateFromTempYear[i], this.dateFromTempMonth[i] - 1, this.dateFromTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateFrom = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateFrom = null;
            }
            if (this.dateToTempDay[i] && this.dateToTempMonth[i] && this.dateToTempYear[i]) {
                // Constructing Date object in UTC timezone
                const newDate = new Date(Date.UTC(this.dateToTempYear[i], this.dateToTempMonth[i] - 1, this.dateToTempDay[i]));
                const dateString = newDate.toISOString().split('T')[0];
                this.workExperiences[i].dateTo = dateString;
                this.messageEvent.emit(this.workExperiences);
            } else {
                this.workExperiences[i].dateTo = null;
            }
        }
    }

    toggleWorkExperience() {
        this.hasWorkExperience = !this.hasWorkExperience;
        this.hasWorkExperienceEvent.emit(this.hasWorkExperience);
        if (this.hasWorkExperience) {
            this.resetWorkExperiences();
        }
    }

    resetWorkExperiences() {
        this.workExperiences = [];
        this.dateFromTempYear = [];
        this.dateFromTempMonth = [];
        this.dateFromTempDay = [];
        this.dateToTempYear = [];
        this.dateToTempMonth = [];
        this.dateToTempDay = [];
        this.messageEvent.emit(this.workExperiences);
        this.workExperiences.push(new AtApplicantsExperience());
    }

    addNewWorkExperience() {
        // Provjeri da li je zadnje dodano ispravno
        if (this.isLastAddedWorkExperienceValid()) {
            this.workExperiences.push(new AtApplicantsExperience());
            this.messageEvent.emit(this.workExperiences);
        }
    }

    deleteWorkExperience(index: number) {
        if (this.workExperiences.length === 1) {
            this.workExperiences = [];
            this.dateFromTempYear = [];
            this.dateFromTempMonth = [];
            this.dateFromTempDay = [];
            this.dateToTempYear = [];
            this.dateToTempMonth = [];
            this.dateToTempDay = [];
            this.messageEvent.emit(this.workExperiences);
            this.hasWorkExperience = false;
            this.hasWorkExperienceEvent.emit(this.hasWorkExperience);
        } else if (this.workExperiences.length > 1) {
            this.workExperiences.splice(index, 1);
            this.dateFromTempYear.splice(index, 1);
            this.dateFromTempMonth.splice(index, 1);
            this.dateFromTempDay.splice(index, 1);
            this.dateToTempDay.splice(index, 1);
            this.dateToTempMonth.splice(index, 1);
            this.dateToTempYear.splice(index, 1);
            this.messageEvent.emit(this.workExperiences);
        }
    }

    // Radna iskustva niz
    trackByIndex(index: number, obj: any): any {
        return index;
    }
}
