import { listRegistryComponents } from "../utils/registry.js";
import { printBanner, printStep } from "../utils/ui.js";
export const runList = async (_context) => {
    await printBanner("list — available registry components");
    const components = listRegistryComponents();
    if (components.length === 0) {
        printStep("No components found");
        return;
    }
    for (const component of components) {
        printStep(component);
    }
};
