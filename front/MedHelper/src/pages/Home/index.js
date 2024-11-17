import { View, ScrollView} from 'react-native';
import ListMedication from '../../components/ListMedication'
import AddMedicationScreen from '../medication/addMedication';
import MedicationCalendar from '@/src/components/MedicationCalendar';
import SearchBar from '@/src/components/Search';
export default function Home() {
 return (

  <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
        <SearchBar></SearchBar>
        
    </View>
    <View>
    <ListMedication />
    </View>
  </ScrollView>
  );
}