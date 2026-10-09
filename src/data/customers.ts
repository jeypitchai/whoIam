// Uploaded artwork stays unchanged; bounds remove excess padding in the UI.
export type Customer = {
  name: string;
  file: string;
  source: readonly [number, number];
  bounds: readonly [number, number, number, number];
  displayWidth: number;
  invert?: boolean;
};

export const customers: readonly Customer[] = [
  { name: 'Birch', file: 'birch', source: [345, 107], bounds: [0, 0, 345, 107], displayWidth: 164 },
  { name: 'Cisco', file: 'cisco', source: [160, 84], bounds: [3, 0, 154, 84], displayWidth: 116 },
  { name: 'Asurion', file: 'asurion', source: [160, 84], bounds: [46, 29, 64, 19], displayWidth: 114, invert: true },
  { name: 'Wolters Kluwer', file: 'wolters-kluwer', source: [160, 83], bounds: [8, 28, 144, 27], displayWidth: 158 },
  { name: 'CNN', file: 'cnn', source: [160, 74], bounds: [0, 0, 160, 74], displayWidth: 100 },
  { name: 'Datavant / Ciox', file: 'datavant-ciox', source: [160, 89], bounds: [21, 14, 110, 58], displayWidth: 118 },
  { name: 'UCPB', file: 'ucpb', source: [159, 160], bounds: [0, 0, 159, 160], displayWidth: 76 },
  { name: 'McKesson', file: 'mckesson', source: [160, 122], bounds: [0, 46, 160, 29], displayWidth: 154 },
  { name: 'FedEx', file: 'fedex', source: [160, 160], bounds: [13, 57, 135, 43], displayWidth: 122 },
  { name: 'Purchasing Power', file: 'purchasing-power', source: [148, 50], bounds: [0, 0, 148, 50], displayWidth: 142 },
  { name: 'LKQ', file: 'lkq', source: [447, 447], bounds: [32, 167, 397, 107], displayWidth: 120 },
  { name: 'Supreme Ventures Group', file: 'supreme-ventures', source: [507, 519], bounds: [49, 10, 405, 498], displayWidth: 74 },
];
