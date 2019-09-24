import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RgRegions} from '../../../models/regions.model';
import {LoggerService} from '../../../../services/logger.service';
import {RegistersService} from '../../../services/registers.service';

@Component({
    selector: 'app-region-select',
    templateUrl: './region-select.component.html',
})
export class RegionSelectComponent implements OnInit {
    @Output('citySelected') lowestLevelSelected: EventEmitter<number> = new EventEmitter<number>();
    @Input() lowestLevelId: number;
    @Input() showOnlyCities = true;
    allRegions: RgRegions[];
    regionLevels:
        {
            regionTypeName: string,
            regions: RgRegions[],
            position: number,
            selectedRegionId: number
        }[] = [];

    constructor(private registersService: RegistersService,
                private logger: LoggerService) {
    }

    ngOnInit() {
        this.getRegions();
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
        // TODO unstable
        const regions: RgRegions[] = this.allRegions.filter((item: RgRegions) => item.idTypeId === 4);
        if (regions && regions.length > 0) {
            this.regionLevels.push({
                regionTypeName: regions[0].idTypeName,
                regions: regions,
                position: 1,
                selectedRegionId: null
            });
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
