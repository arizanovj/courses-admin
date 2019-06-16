


import * as moment from "moment";
import { ConfigService } from "../../model/config.service";


export class Filter {

  protected filters = [];
  filter = [
    { filter: 'et', filterName: 'equals to = ' },
    { filter: 'cnt', filterName: '%contains%' },
    { filter: 'cnts', filterName: '%starts with' },
    { filter: 'cnte', filterName: 'ends% with' },
    { filter: 'lt', filterName: 'less than <' },
    { filter: 'gt', filterName: 'greater than >' },
    { filter: 'lte', filterName: 'less than or equal <=' },
    { filter: 'gte', filterName: 'greater than or equal >=' },
  ];

  protected setFiltersByType(type: string, types) {
    this.filter.forEach(filter => {
      if ((types[type]).indexOf(filter.filter) > -1) {
        this.filters.push(filter);
      }
    });

  }
  protected getFilterKey(name: string): string {
    return "filter[" + name + "]";
  }

  protected getFilterValue(filter: string, value: string, type: string): string {
    if (type == "date") {
      value = moment(value).format(ConfigService.DATE_TIME_FORMAT_TIMESTAMP);
    }
    return filter + "|" + value;
  }

  protected getNameFromUrlFilter(filterName) {
    return (filterName.slice(7)).replace("]","");
  }

  protected getFilterAndValue(filter) {
    let valueAndFilter = filter.split("|");
    return {
      filter: valueAndFilter[0],
      value: valueAndFilter[1]
    }
  }

  protected getFilterAndValueByName(params, name) {
    if (Object.keys(params).length > 0) {
      for (let param in params) {
        if (name === this.getNameFromUrlFilter(param)) {
          return this.getFilterAndValue(params[param]);
        }
      }
    }
    return null;
  }

}
