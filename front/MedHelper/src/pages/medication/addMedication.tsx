import { View, ScrollView} from 'react-native';
import AddMedication from '@/src/components/AddMedication';
import EditMedication from '@/src/components/EditMedication';
export default function Medication() {
 return (

  <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
        <AddMedication/>
        
        
    </View>
    <View>
        <EditMedication/>
    </View>
   
    </ScrollView>
  );
}