enum BM_TYPE {
  G = 'gene',
  P = 'protein',
}

export interface Structure {
  name?: string;
  id?: string;
  rdfs_label?: string;
  b_type?: BM_TYPE;
}

interface Row {
  anatomical_structures: Array<Structure>;
  cell_types: Array<Structure>;
  biomarkers: Array<Structure>;
}

export interface AnatomicalStructures {
  data: Row[];
}
