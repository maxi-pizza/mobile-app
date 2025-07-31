import React, {useEffect, useState} from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {version} from '../../../package.json';
import {agent} from '~/../APIClient';
import Spinner from 'react-native-loading-spinner-overlay/lib';

type Props = {
  children?: React.ReactNode;
};

const OldAppVersion = ({children}: Props) => {
  const [isOutdated, setIsOutdated] = useState<boolean | null>(null);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    const checkVersion = async () => {
      const latestVersion = (await agent.getAppAllowedVersion()).data;
      if (
        version.localeCompare(latestVersion?.android, undefined, {
          numeric: true,
          sensitivity: 'base',
        }) < 0
      ) {
        setIsOutdated(true);
      } else {
        setIsOutdated(false);
      }
      setLink(latestVersion.android_link);//todo  android/ios version switch
    };
    checkVersion();
  }, []);

  if (isOutdated === null)
    return (
      <Spinner
        visible={isOutdated === null}
        textContent={'Loading...'}
        textStyle={{color: 'yellow'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
    );

  if (isOutdated)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ваша версія додатку застаріла</Text>
        <Text style={styles.version}>Версія: {version}</Text>
        <Text style={styles.instruction}>
          Будь ласка, оновіть додаток до останньої версії.
        </Text>
        {link && (
          <Pressable
            style={styles.button}
            onPress={() => {
              Linking.openURL(link);
            }}>
            <Text style={styles.buttonText}>Оновити</Text>
          </Pressable>
        )}
      </View>
    );

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  version: {
    marginBottom: 10,
    color: 'gray',
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FFE600',
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: '600',
    color: 'black',
  },
});
export default OldAppVersion;
