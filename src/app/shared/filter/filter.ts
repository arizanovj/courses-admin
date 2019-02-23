import { QueryList } from "@angular/core/";


import * as moment from "moment";
import { ConfigService } from "../../model/config.service";
import { DatetimeFilterComponent } from "./datetime-filter/datetime-filter.component";

export class Filter {

  protected filters = [];
  filter = [
    { filter: 'et', filterName: 'equals to = ' },
    { filter: 'cnt', filterName: '%contains%'},
    { filter: 'cnts', filterName: '%starts with'},
    { filter: 'cnte', filterName: 'ends% with'},
    { filter: 'lt', filterName: 'less than <' },
    { filter: 'gt', filterName: 'greater than >' },
    { filter: 'lte', filterName: 'less than or equal <=' },
    { filter: 'gte', filterName: 'greater than or equal >=' },
  ];

  protected setFiltersByType(type: string,types) {
    this.filter.forEach(filter => {
      if ((types[type]).indexOf(filter.filter) > -1) {
        this.filters.push(filter);
      }
    });

  }

  public static getFilters(filters){
    let filtersArray = [];
    filters.forEach(filterComponents => {
      filterComponents.forEach(filter => { 
        if(filter.filterForm.valid){
          filtersArray[filter.name] = filter.filterForm.value.filter + "|" +filter.filterForm.value.value
        }
      });
    });
    return filtersArray;
  
  }

  public static getUrlFormattedFilters(filters){
    let filtersArray = [];
    filters.forEach(filterComponents => {

      filterComponents.forEach((filter) => { 

      
        let value = filter.filterForm.value.value;
 
        if(filter.type == "date"){
          value = moment(value).format(ConfigService.DATE_TIME_FORMAT_TIMESTAMP);
        }

        if(filter.filterForm.valid){
          filtersArray["filter["+filter.name+"]"] = filter.filterForm.value.filter + "|" +value
        }
      });
    });

    return filtersArray;
  }


}
