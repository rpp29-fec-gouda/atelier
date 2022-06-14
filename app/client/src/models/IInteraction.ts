export interface IInteraction {
  /** Selector for the element which was clicked. */
  "element": string,
  /** Name of the module/widget in which the click occured. */
  "widget": string,
  /** Time the interaction occurred. */
  "time": string
}