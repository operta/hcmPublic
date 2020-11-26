import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AtApplicants } from "../../../applicants/models/applicant.model";
import { ApplicantsService } from "../../../applicants/services/applicants.service";
import { RegistersService } from "../../../applicants/services/registers.service";
import { forkJoin, Observable, of } from "rxjs";
import { AtApplicantsSchools } from "../../../applicants/models/applicant-school.model";
import { AtApplicantsExperience } from "../../../applicants/models/applicant-experience.model";
import { switchMap } from "rxjs/operators";
import Swal from "sweetalert2";
import { AtApplicantsExperienceService } from "../../../applicants/services/applicant-experience.service";
import { AtApplicantsSchoolsService } from "../../../applicants/services/applicant-schools.service";
import { VacancyService } from "src/app/applicants/services/vacancy.service";

@Component({
	selector: "app-no-auth-apply",
	templateUrl: "./no-auth-apply-page.component.html",
	styleUrls: ["./no-auth-apply-page.component.scss"],
})
export class NoAuthApplyPageComponent implements OnInit, OnDestroy {
	vacancyId: number;
	vacancyName: string;
	applicant: AtApplicants = new AtApplicants();
	school = new AtApplicantsSchools();
	qualifications$: Observable<any>;
	schools$: Observable<any>;

	// Atributi za korake
	osnovniPodaciKorak = true;
	kvalifikacijeKorak = false;
	radnoIskustvoKorak = false;
	napomenaKorak = false;
	value = 25;

	// Radno iskustvo
	hasWorkExperience = false;
	workExperiences: AtApplicantsExperience[] = [];

	constructor(
		private route: ActivatedRoute,
		private applicantsService: ApplicantsService,
		private router: Router,
		private registersService: RegistersService,
		private experienceService: AtApplicantsExperienceService,
		private schoolsService: AtApplicantsSchoolsService,
		private vacancyService: VacancyService
	) {
		this.workExperiences.push(new AtApplicantsExperience());
		this.loadVacancyData();
	}

	private loadVacancyData() {
		this.vacancyId = +this.route.snapshot.params.vacancyId;
		this.vacancyName = this.vacancyService.vacancyOnWhichUserIsApplying;
	}

	addNewWorkExperience() {
		// Provjeri da li je zadnje dodano ispravno
		if (this.isLastAddedWorkExperienceValid()) {
			this.workExperiences.push(new AtApplicantsExperience());
		}
	}

	private isLastAddedWorkExperienceValid(): boolean {
		const we = this.workExperiences[this.workExperiences.length - 1];
		if (!we.dateFrom || !we.position) {
			this.showSwalert("Pozicija i datum od su obavezni.", "error");
			return false;
		}
		return true;
	}

	resetWorkExperiences() {
		this.workExperiences = [];
		this.workExperiences.push(new AtApplicantsExperience());
	}

	ngOnInit() {
		this.schools$ = this.registersService.getSchools();
		this.qualifications$ = this.registersService.getQualifications();
	}

	apply() {
		this.applicant.phoneNumber = this.applicant.phoneNumber.toString();
		this.applicantsService
			.createNoAuth(this.applicant, this.vacancyId)
			.pipe(
				switchMap((createdApplicant: AtApplicants) => {
					this.school.idApplicantId = createdApplicant.id;
					if (this.hasWorkExperience) {
						const observableBatch = [];
						this.workExperiences.forEach((we) => {
							we.idApplicantId = createdApplicant.id;
							observableBatch.push(
								this.experienceService.create(we)
							);
						});
						return forkJoin(observableBatch);
					}
					return of(null);
				}),
				switchMap(() => this.schoolsService.create(this.school))
			)
			.subscribe(() => {
				this.showSwalert(
					"Email za aktivaciju profila je poslan na Vašu email adresu.",
					"success",
					"Prijava uspjela"
				);
				this.router.navigate(['/']);
			}, (error) => {
				console.log(error);
			});
	}

	onCitySelected(regionId: number) {
		this.applicant.idCity = regionId;
	}

	private showSwalert(message: string, type: string, title?: string) {
		Swal.fire({
			title: title ? title : type === "error" ? "Greška" : "Uspjeh",
			text: message,
			type: type === "error" ? "error" : "success",
		});
	}

	ngOnDestroy() {
		this.vacancyService.vacancyOnWhichUserIsApplying = null;
	}

	schoolChanged(event: any) {
		const id = +event.target.value;
		if (id > 0) {
			this.school.idSchool = id;
		} else if (id === -1) {
			Swal.fire({
				title: "Ime škole",
				input: "text",
				inputAttributes: {
					autocapitalize: "off",
				},
				showCancelButton: true,
				cancelButtonText: "Otkaži",
				confirmButtonText: "Dodaj",
				showLoaderOnConfirm: true,
				preConfirm: (name) => {
					return this.schoolsService.createNewSchool(name).subscribe(
						(response) => {
							this.schoolCreated(response);
							return response;
						},
						(error) => {
							Swal.showValidationMessage(`Greška: ${error}`);
						}
					);
				},
				allowOutsideClick: () => !Swal.isLoading(),
			}).then((result) => {
				if (!result.dismiss) return;
				// Korisnik odustao, vrati select na početni izgled
				const skolaSelectElement = <HTMLSelectElement>(
					document.getElementById("field_idschool")
				);
				skolaSelectElement.value = "-2";
			});
		} else {
			this.showSwalert("Odaberite školu", "error");
		}
	}

	private schoolCreated(school: { id: number; name: string }) {
		this.school.idSchool = school.id;
		this.school.idSchoolName = school.name;
		const skolaSelectElement = <HTMLSelectElement>(
			document.getElementById("field_idschool")
		);
		const novaSkolaOption = document.createElement("option");
		novaSkolaOption.value = school.id.toString();
		novaSkolaOption.text = school.name;
		skolaSelectElement.appendChild(novaSkolaOption);
		skolaSelectElement.value = novaSkolaOption.value;

		// Sada možemo ukloniti 'Dodaj novu školu'
		skolaSelectElement.removeChild(document.getElementById("novaSkola"));
	}

	// Funkcije za korake
	goToOsnovniPodaci() {
		this.osnovniPodaciKorak = true;
		this.kvalifikacijeKorak = false;
		this.value = 25;
	}

	goToKvalifikacije() {
		if (this.osnovniPodaciIspravni()) {
			this.osnovniPodaciKorak = false;
			this.kvalifikacijeKorak = true;
			this.radnoIskustvoKorak = false;
			this.value = 50;
		}
	}

	goToRadnoIskustvo() {
		if (this.kvalifikacijeIspravne()) {
			this.kvalifikacijeKorak = false;
			this.radnoIskustvoKorak = true;
			this.napomenaKorak = false;
			this.value = 75;
		}
	}

	goToNapomena() {
		// Provjeri zadnji red prije spremanja
		if (this.hasWorkExperience) {
			if (!this.isLastAddedWorkExperienceValid()) {
				return;
			}
		}

		// Ukloni zadnji prazni red ako ga je korisnik dodao
		this.workExperiences = this.workExperiences.filter((we) => we.dateFrom);

		// Uklini sva iskustva ako je na kraju odabrao da nema iskustva
		this.workExperiences = this.hasWorkExperience
			? this.workExperiences
			: [];

		this.radnoIskustvoKorak = false;
		this.napomenaKorak = true;
		this.value = 100;
	}

	deleteWorkExperience(index: number) {
		if (this.workExperiences.length === 1) {
			this.workExperiences = [];
			this.hasWorkExperience = false;
		} else if (this.workExperiences.length > 1) {
			this.workExperiences.splice(index, 1);
		}
	}

	private osnovniPodaciIspravni(): boolean {
		if (!this.applicant.name || !this.applicant.surname) {
			this.showSwalert("Ime i prezime su obavezni", "error");
			return false;
		}
		if (!this.applicant.birthdate) {
			this.showSwalert("Datum rođenja je obavezan", "error");
			return false;
		}
		if (!this.applicant.email) {
			this.showSwalert("Email je obavezan", "error");
			return false;
		}
		if (!this.applicant.phoneNumber) {
			this.showSwalert("Broj telefona je obavezan", "error");
			return false;
		}
		if (!this.applicant.idCity) {
			this.showSwalert("Grad je obavezan", "error");
			return false;
		}
		return true;
	}

	private kvalifikacijeIspravne(): boolean {
		if (!this.applicant.idQualifcation || !this.school.idQualifcation) {
			this.showSwalert(
				"Stručna i postignuta stručna sprema su obavezni",
				"error"
			);
			return false;
		}
		if (!this.applicant.driverLicence) {
			this.showSwalert("Vozačka dozvola je obavezna", "error");
			return false;
		}
		if (!this.school.idSchool) {
			this.showSwalert("Škola je obavezna", "error");
			return false;
		}
		return true;
	}

	// Radna iskustva niz
	trackByIndex(index: number, obj: any): any {
		return index;
	}
}
