export class QueryAnything {
  private readonly original: any;
  private isArray = false;
  private store: {
    [propName: string]: any;
  };
  private firstCall = true;
  private matched = 0;

  get values(): any[] {
    return Object.values(this.store);
  }

  get count(): number {
    return this.matched;
  }

  constructor(obj: any) {
    if (typeof obj === 'object') {
      this.original = obj;
    } else {
      this.original = [obj];
    }
    this.isArray = Array.isArray(this.original);
    this.store = {};
  }

  private getObj(): any {
    if (this.firstCall) {
      this.firstCall = false;
      return this.original;
    }
    const temp = { ...this.store };
    this.store = {};
    this.matched = 0;
    return temp;
  }

  private positiveSearch(
    obj: {
      [propName: string]: any;
    },
    keyCompare?: (key: string) => boolean,
    valueCompare?: (value: any) => boolean
  ): void {
    Object.keys(obj).forEach(key => {
      if (keyCompare && keyCompare(key)) {
        this.store[key] = obj[key];
        this.matched++;
      } else if (valueCompare && valueCompare(obj[key])) {
        this.store[key] = obj[key];
        this.matched++;
      }
      if (typeof obj[key] === 'object') {
        this.positiveSearch(obj[key], keyCompare, valueCompare);
      }
    });
  }

  private negativeSearch(
    obj: {
      [propName: string]: any;
    },
    keyCompare?: (key: string) => boolean,
    valueCompare?: (value: any) => boolean
  ): void {
    Object.keys(obj).forEach(key => {
      if (keyCompare && keyCompare(key)) {
        this.store[key] = obj[key];
        this.matched++;
        if (typeof obj[key] === 'object') {
          this.negativeSearch(obj[key], keyCompare, valueCompare);
        }
      } else if (valueCompare) {
        if (typeof obj[key] === 'object') {
          this.negativeSearch(obj[key], keyCompare, valueCompare);
        } else if (valueCompare(obj[key])) {
          this.store[key] = obj[key];
          this.matched++;
        }
      }
    });
  }

  withKey(key: string | number | RegExp): QueryAnything {
    if (typeof key === 'object') {
      this.positiveSearch(this.getObj(), k => key.test(k));
    } else {
      this.positiveSearch(this.getObj(), k => k === key);
    }
    return this;
  }

  withoutKey(key: string | number | RegExp): QueryAnything {
    if (typeof key === 'object') {
      this.negativeSearch(this.getObj(), k => !key.test(k));
    } else {
      this.negativeSearch(this.getObj(), k => k !== key);
    }
    return this;
  }

  withValue(value: any): QueryAnything {
    this.positiveSearch(this.getObj(), undefined, v => v === value);
    return this;
  }

  withoutValue(value: any): QueryAnything {
    this.negativeSearch(this.getObj(), undefined, v => v !== value);
    return this;
  }

  // whereKey(fn: any[] | ((key: string | number) => boolean)): QueryAnything {
  //   if (typeof fn === 'function') {
  //     this.positiveSearch(this.getObj(), fn);
  //   } else {
  //     throw new Error('syntax not yet supported');
  //   }
  //   return this;
  // }

  whereKey(fn: (key: string | number) => boolean): QueryAnything {
    this.positiveSearch(this.getObj(), fn);
    return this;
  }

  // whereValue(fn: any[] | ((value: any) => boolean)): QueryAnything {
  //   if (typeof fn === 'function') {
  //     this.negativeSearch(this.getObj(), undefined, fn);
  //   } else {
  //     throw new Error('syntax not yet supported');
  //   }
  //   return this;
  // }

  whereValue(fn: (value: any) => boolean): QueryAnything {
    this.negativeSearch(this.getObj(), undefined, fn);
    return this;
  }

  reset(): void {
    this.store = {};
    this.firstCall = true;
  }

  reconstruct(): any {
    return this.isArray ? Object.values(this.store) : { ...this.store };
  }
}
