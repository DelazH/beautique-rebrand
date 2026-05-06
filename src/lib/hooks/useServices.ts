import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import { Service } from '../../types';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data as Service[];
    },
  });
}
