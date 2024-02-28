
// planet.interface.ts



// interficie per a la informació dels planetes de Starwars

export interface Planet {

  id?:             string;
  name:            string;
  rotation_period: string;
  orbital_period:  string;
  diameter:        string;
  climate:         string;
  gravity:         string;
  terrain:         string;
  surface_water:   string;
  population:      string;
  residents:       string[];
  films:           string[];
  created:         Date;
  edited:          Date;
  url:             string;
}
