import Configuration from '../Configuration/Configuration';
import Animation from '../Animation/Animation';

export default function Partie() {

    // TODO envoyer param enfantPreChoisiConfig (sous forme de tableaux d'objets)
    // TODO gestion des affichages (affichers d'abord component config puis animation)
  return (
          <div>
                <Configuration/>
                <Animation/>
          </div>
  )
}