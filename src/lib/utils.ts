import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Condition = {
  attribute: string;
  operator: string;
  value: any;
};

function parseCondition(condition: string): Condition | null {
  const operatorRegex = /(===|==|!=|>=|<=|>|<|=|\|\||like)/;
  const match = condition.match(operatorRegex);

  if (!match) return null;

  const operator = match[0];
  const [attribute, value] = condition
    .split(operator)
    .map((part) => part.trim());

  return {
    attribute,
    operator,
    value: isNaN(Number(value)) ? value : Number(value), // Attempt to convert to a number if applicable
  };
}

function applyCondition<T>(obj: T, condition: Condition): boolean {
  const { attribute, operator, value } = condition;
  const objectValue = (obj as any)[attribute.toLowerCase().replaceAll(" ", "")];
  console.log({ obj, attribute });

  if (objectValue === undefined) {
    throw new Error(`Unsupported attribute: ${attribute}`);
  }
  // if (objectValue === null) {
  //   throw new Error(`Unsupported attribute: ${attribute}`);
  // }

  switch (operator) {
    case ">":
      return objectValue > value;
    case ">=":
      return objectValue >= value;
    case "<":
      return objectValue < value;
    case "<=":
      return objectValue <= value;
    case "==":
    case "===":
    case "=":
      return objectValue == value; // strict equality to handle type coercion
    case "!=":
      return objectValue != value;
    default:
      // TODO: impliment like
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function filterObjects<T>(objects: T[], conditions: string[]): T[] {
  // Parse all conditions into an array of Condition objects
  const parsedConditions = conditions
    .map(parseCondition)
    .filter((cond): cond is Condition => cond !== null);

  // Apply all conditions in an AND (&&) fashion
  return objects.filter((obj) =>
    parsedConditions.every((condition) => applyCondition(obj, condition))
  );
}

// Example usage:
interface Item {
  value: number;
  cost: number;
  currency: string;
}

function searchInObject<T>(obj: T, searchString: string) {
  // Convert the search string to lowercase for case-insensitive search
  const lowerSearchString = searchString.toLowerCase();

  // Loop over the object values
  for (const value of Object.values(JSON.parse(JSON.stringify(obj)))) {
    // If the value is a string, check if the search string exists within it
    if (
      typeof value === "string" &&
      value.toLowerCase().includes(lowerSearchString)
    ) {
      return true;
    }
  }

  // If no match is found, return false
  return false;
}

export function advancedSearch<T>(search: string, objects: T[]) {
  if (parseCondition(search) === null && search !== "") {
    // do a basic search
    return {
      data: objects.filter((obj) => {
        return searchInObject(obj, search);
      }),
      error: null,
    };
  }
  const conditions = search.split("&&").map((s) => s.trim());
  try {
    const filteredItems = filterObjects(objects, conditions);
    return { data: filteredItems, error: null };
  } catch (e: any) {
    return { data: objects, error: e.toString() };
  }
}

const successColor = "text-red-500";
const failureColor = "text-green-500";
const arrowStyle = "h-4 w-4 font-bold stroke-2";

export const getPercentColor = (percentage: number, inverse: boolean) => {
  const p = percentage;
  if (!inverse) {
    if (p < 0) {
      return successColor;
    }
    return failureColor;
  }
  if (p > 0) {
    return successColor;
  }
  return failureColor;
};

// Output: [ { value: 30, cost: 100, currency: 'USD' }, { value: 40, cost: 100, currency: 'USD' } ]
