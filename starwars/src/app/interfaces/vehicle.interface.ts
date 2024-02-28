
// vehicle.interface.ts



// Interficie per a la informació dels vehicles de Starwars

export interface Vehicle {

  id?:              string;
  name:             string;
  classification:   string;
  designation:      string;
  average_height:   string;
  skin_colors:      string;
  hair_colors:      string;
  eye_colors:       string;
  average_lifespan: string;
  homeworld:        string;
  language:         string;
  people:           string[];
  films:            string[];
  created:          Date;
  edited:           Date;
  url:              string;
}
