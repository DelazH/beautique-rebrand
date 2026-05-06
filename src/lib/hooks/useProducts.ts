import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import { Product } from '../../types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('stock', 0);
      
      if (error) throw error;
      return data as Product[];
    },
  });
}
