import { View, ScrollView} from 'react-native';
import ListMedication from '../../components/ListMedication'
import AddMedicationScreen from '../medication/addMedication';
import MedicationCalendar from '@/src/components/MedicationCalendar';
export default function Home() {
 return (

  <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
        <MedicationCalendar/>
        
    </View>
    <View>
    <ListMedication />
    </View>
  </ScrollView>
  );
}