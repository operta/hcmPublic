import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RgRegions} from '../../../models/regions.model';
import {LoggerService} from '../../../../services/logger.service';
import {RegistersService} from '../../../services/registers.service';
import {ApplicantConstantsService} from '../../../services/applicant-constants.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-region-select',
    templateUrl: './region-select.component.html',
})
export class RegionSelectComponent implements OnInit, OnDestroy {
    @Output('citySelected') lowestLevelSelected: EventEmitter<number> = new EventEmitter<number>();
    @Input() lowestLevelId: number;
    @Input() showOnlyCities = true;
    private unsubscribe: Subject<void> = new Subject<void>();

    allRegions: RgRegions[];
    regionLevels:
        {
            regionTypeName: string,
            regions: RgRegions[],
            position: number,
            selectedRegionId: number
        }[] = [];

    constructor(private registersService: RegistersService,
                private logger: LoggerService,
                private constantsService: ApplicantConstantsService) {
    }

    ngOnInit() {
        this.getRegions();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    getRegions() {
        this.registersService.getRegions().subscribe(
            (items) => {
                const regions: RgRegions[] = items;
                if (regions && regions.length > 0) {
                    this.allRegions = regions;
                    this.regionLevels = [];
                    this.setCityOnHighestLevel();
                }
            }, (error: any) => this.logger.onError(error)
        );
    }


    setCityOnHighestLevel() {
        this.constantsService.findByKey('regionTypeCityId')
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {
                const regions: RgRegions[] = this.allRegions.filter((item: RgRegions) => item.idTypeId === +res.value);
                if (regions && regions.length > 0) {
                    this.regionLevels.push({
                        regionTypeName: regions[0].idTypeName,
                        regions,
                        position: 1,
                        selectedRegionId: null
                    });
                }
                this.prepopulateSelectedCity();
            });
    }

    private prepopulateSelectedCity() {
        if (this.lowestLevelId) {
            const city = this.allRegions.find((r) => r.id === this.lowestLevelId);
            const regionTypeName = this.regionLevels.find((rl) => rl.regionTypeName === city.idTypeName);
            this.regionLevels.forEach((rl) => {
                if (rl.regionTypeName === regionTypeName.regionTypeName) {
                    const region = rl.regions.find((region) => region.id === city.id);
                    if (region) {
                        rl.selectedRegionId = this.lowestLevelId;
                    }
                }
            })
        }
    }

    onItemSelected(selectedRegion: RgRegions, position: number) {
        const selectedLevel = this.regionLevels.find((item) => item.position === position);
        if (selectedLevel && selectedRegion) {
            selectedLevel.selectedRegionId = selectedRegion.id;
        }
        this.deleteRegionLevelsByPosition(position);
        if (selectedRegion) {
            const children = this.allRegions.filter((item: RgRegions) => item.idParentId === selectedRegion.id);
            if (children && children.length > 0) {
                this.regionLevels.push({
                    regionTypeName: children[0].idTypeName,
                    regions: children,
                    position: ++position,
                    selectedRegionId: null
                });
            } else {
                this.lowestLevelSelected.emit(selectedRegion.id);
            }
        }
    }

    deleteRegionLevelsByPosition(position: number) {
        this.regionLevels = this.regionLevels.filter((item) => item.position <= position);
    }

}
