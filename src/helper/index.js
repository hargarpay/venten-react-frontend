export const rtrim = (str, remove, replace = '') => {
    const lastIndex = str.lastIndexOf(remove);
    const newStr = str.replace(new RegExp(remove, 'g'),
      (match, offset) => (offset === lastIndex ? replace : match));
    return newStr;
  };

export const propsAvailable = (name, objectData) => Object.prototype
    .hasOwnProperty.call(objectData, name);
  
  export const isEmpty = (val, str = false) => {
    let empty = val === null || val === undefined;
    if (!empty && str === true) {
      empty = val.trim() === '';
    }
    return empty;
  };
  
  export const propExist = (obj, props, depth, max) => {
    // props[depth] is each array of properties to check in the object
    // obj[props[depth]] Get the value of the props
    const exist = isEmpty(obj) ? false : propsAvailable(props[depth], obj);
    // Check if the propert exist in the object
    if (!exist) {
      //  if it does not exist return false
      return false;
    }
    const newObj = obj[props[depth]];
    // Go to the child property
    const newDepth = depth + 1;
    // If the depth is attain return false
    // Else check if the child property exist
    return newDepth === max ? true : propExist(newObj, props, newDepth, max);
  };
  
  export function deepPropsExist(obj, ...props) {
    // tslint:disable-next-line:no-shadowed-constiable
    const depth = props.length;
    return propExist(obj, props, 0, depth);
  }
  
  export function invalidMinLength(value, min) {
    // console.log(`${value}`.length < min, `${value}`.length, min);
    return `${value}`.length < min;
  }
  
  export function invalidMaxLength(value, max) {
    return `${value}`.length > max;
  }
  
  export function invalidAllowExts(value, extensions) {
    return !Array.isArray(extensions) || extensions.indexOf(value) === -1;
  }
  
  export function invalidEmail(value) {
    return !(/[a-zA-Z0-9._#~&-]+@[a-zA-Z0-9._#~&-]+\.[a-z]{2,}/.test(value));
  }
  
  export function invalidCompare(value, compareValue) {
    return value !== compareValue;
  }

  export function getObjValue(obj, props, depth, max) {
    // props[depth] is each array of properties to check in the object
    // obj[props[depth]] Get the value of the props
    const exist = isEmpty(obj) ? false : propsAvailable(props[depth], obj);
    // Check if the propert exist in the object
    if (!exist) {
        //  if it does not exist return false
        return null;
    }
    const newObj = obj[props[depth]];
    // Go to the child property
    const newDepth = depth + 1;
    // If the depth is attain return false
    // Else check if the child property exist
    return newDepth === max ? newObj : getObjValue(newObj, props, newDepth, max);
}

export function getDeepObjValue(obj, ...props) {
    // tslint:disable-next-line:no-shadowed-constiable
    const max = props.length;
    return getObjValue(obj, props, 0, max);
}

  export function isEqual(value, other) {
    // Get the value type
    const type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
        return false;
    }

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
        return false;
    }

    // Compare the length of the length of the two items
    const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
        return false;
    }

    // Compare properties
    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) {
                return false;
            }
        }
    } else {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) {
                    return false;
                }
            }
        }
    }

    // If nothing failed, return true
    return true;

}

// Compare two items
function compare(item1, item2) {

    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!isEqual(item1, item2)) {
            return false;
        }
    } else { // Otherwise, do a simple comparison

        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) {
            return false;
        }

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) {
                return false;
            }
        } else {
            if (item1 !== item2) {
                return false;
            }
        }
    }
    return true;
}
  
  