import * as React from 'react'; 
import { Ionicons } from '@expo/vector-icons';

export default function Icon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string, iconStyle?: object, size?: number }) {
    return <Ionicons size={30} style={{ marginBottom: -3, ...props.iconStyle }} {...props} />;
}