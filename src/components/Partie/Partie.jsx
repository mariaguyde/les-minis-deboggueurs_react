import { data } from '../../data/data';
import Configuration from '../Configuration/Configuration';

export default function Partie() {

    console.log(data);
    let joueurs =data.enfants;

    const choisirJoueur = () => {
        console.log('im here');
        console.log(data);
    }

    console.log(joueurs);
    joueurs.map(enfant => console.log(enfant));
    //choisirJoueur();

  return (
          <div>
              { joueurs.map(enfant => enfant.nom)}
                <Configuration/>
              
          </div>
  )
}