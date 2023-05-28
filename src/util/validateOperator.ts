import { Operator, OperatorData } from "types/operator";
import operatorJson from "data/operators.json";
import { MAX_LEVEL_BY_RARITY, MAX_PROMOTION_BY_RARITY, MODULE_REQ_BY_RARITY } from "./changeOperator";

// Strategy: Build "safe" dependencies from the top
// Could probably be optimized, but ultimately pretty efficient
export default function (op: Operator) {
  const opData: OperatorData = operatorJson[op.id as keyof typeof operatorJson];

  // invalid id
  if (!opData) return false;

  // favorite is always safe

  // checks for the existence of ANY masteries or modules
  const masteries = op.masteries.reduce((a, b) => a + b, 0);
  const modules = op.modules.reduce((a, b) => a + b, 0);

  // validate owned
  if (!op.potential) {
    if (op.promotion !== -1) return false;
    if (op.level) return false;
    if (op.rank) return false;
    if (op.skin) return false;
    if (masteries) return false;
    if (modules) return false;
  }

  // validate elite and level
  if (op.promotion < 0) return false;
  if (op.promotion > MAX_PROMOTION_BY_RARITY[opData.rarity]) return false;
  if (op.level < 1) return false;
  if (op.level > MAX_LEVEL_BY_RARITY[opData.rarity][op.promotion]) return false;

  // validate rank
  if (op.rank < 1) return false;
  if (opData.rarity < 3 && op.rank !== 1) return false;
  if (op.promotion === 0 && op.rank > 4) return false;
  if (op.rank > 7) return false;

  // validate masteries
  if (masteries) {
    // min reqs
    if (op.promotion !== 2 || op.rank !== 7) return false;
    if (op.masteries.length !== opData.skillData.length) return false;
    if (op.masteries.filter(n => 0 < n || 3 < n).length) return false;
  }

  // validate modules
  if (modules) {
    // check min reqs
    if (op.promotion !== 2 || op.level < MODULE_REQ_BY_RARITY[opData.rarity]) return false;
    if (op.modules.length !== opData.moduleData.length) return false;
    if (op.modules.filter(n => 0 < n || 3 < n).length) return false;
  }

  // the holy land :prayge:
  return true;
}