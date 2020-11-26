import { Component, Input, OnInit } from "@angular/core";
import { AtVacancies } from "../../../models/vacancy.model";
import { AtJobApplicationsService } from "../../../services/job-application.service";
import { LoggerService } from "../../../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { ApplicantConstantsService } from "../../../services/applicant-constants.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { VacancyService } from 'src/app/applicants/services/vacancy.service';

@Component({
	selector: "app-vacancy-detail",
    templateUrl: "./vacancy-detail.component.html"
})
export class VacancyDetailComponent implements OnInit {
	@Input() vacancy: AtVacancies;
	@Input() canApply: boolean;
	@Input() noAuth: boolean;
	private unsubscribe: Subject<void> = new Subject<void>();

	oglasParagraf1: string;
	oglasParagraf2: string;
	oglasParagraf3: string;

	constructor(
		private service: AtJobApplicationsService,
		private logger: LoggerService,
		private toastr: ToastrService,
		private constantsService: ApplicantConstantsService,
		private router: Router,
		private vacancyService: VacancyService
	) {}

	ngOnInit(): void {
		// disabled because no auth access could compromise security
		// this.loadParagraphs();
	}

	loadParagraphs() {
		this.loadParagraphF("oglasParagraf1");
		this.loadParagraphF("oglasParagraf2");
		this.loadParagraphF("oglasParagraf3");
	}

	loadParagraphF(paragraphKey: string) {
		this.constantsService
			.findByKey(paragraphKey)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(res) => {
					if (paragraphKey === "oglasParagraf1") {
						this.oglasParagraf1 = res.value;
					} else if (paragraphKey === "oglasParagraf2") {
						this.oglasParagraf2 = res.value;
					} else if (paragraphKey === "oglasParagraf3") {
						this.oglasParagraf3 = res.value;
					}
				},
				(err) => {
					this.logger.onError(err);
				}
			);
	}

	apply() {
		this.service.addJobApplication(this.vacancy.id).subscribe(
			() => {
				this.toastr.success(
					`Prijava na oglas ${this.vacancy.name} uspješna!`
				);
				this.canApply = false;
			},
			(error) => this.logger.onError(error)
		);
	}

	applyNoAuth() {
        this.vacancyService.vacancyOnWhichUserIsApplying = this.vacancy.name;
		this.router.navigate(["/no-auth-apply/" + this.vacancy.id]);
	}
}
