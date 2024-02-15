import { deepSearchKey, getDataFromXML } from '@/lib/record';
import { pageData } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

type Props = {
  selector: string;
};

const COMMON_FIELDS = [
  'session',
  'bookmark_count',
  'query_statement',
  'search_statement',
  'first_record_seq',
  'last_record_seq',
  'bookmark_url',
  'total_record',
] as const;

type COMMON_FIELDS_TYPE = (typeof COMMON_FIELDS)[number];

type COMMON_FIELDS_OBJECT = {
  [key in COMMON_FIELDS_TYPE]?: string | number;
};

const useXMLData = ({ selector }: Props) => {
  const [data, setData] = useAtom(pageData);

  const jsonData = getDataFromXML(selector);

  useEffect(() => {
    setData(jsonData);
  }, []);

  const getCommonFields = () => {
    const object: COMMON_FIELDS_OBJECT = {};
    if (!data) return object;
    COMMON_FIELDS.map((key) => {
      const value = deepSearchKey(data, key);
      if (value && value.length > 0) {
        object[key] = value[0] as string;
      }
    });

    return object;
  };

  const common = getCommonFields();
  return { data, common };
};

export default useXMLData;
