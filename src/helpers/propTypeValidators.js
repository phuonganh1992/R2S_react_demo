/**
 * Validate number between min and max
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} isRequired
 *
 * @returns {(Error|TypeError|String)} returns Error or null
 */

const numberBetween = (min, max, isRequired = false) => {
  return (props, propName, componentName) => {
    const propValue = props[propName];
    if (isRequired) {
      if (propValue == null) {
        return new Error(`Prop ${propName} is required on ${componentName}`);
      }
    }

    if (propValue) {
      if (typeof propValue !== "number") {
        return new TypeError(
          `Prop ${propName} must a number on ${componentName}`
        );
      }
      if (propValue < min || propValue > max) {
        return new Error(
          `Prop ${propName} value must be between ${min} and ${max} on ${componentName}`
        );
      }
    }
  };
};

const Validators = {
  numberBetween,
};

export default Validators;
