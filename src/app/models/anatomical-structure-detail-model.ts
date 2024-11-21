export interface StructureDetails {
  name: string;
  description: string;
  ontologyLink: string;
  iri: string;
}

export interface StructureDetailsResponse {
  _embedded: {
    terms: [
      {
        label: string;
        description: string[];
        obo_id: string;
        iri: string;
      }
    ];
  };
}
