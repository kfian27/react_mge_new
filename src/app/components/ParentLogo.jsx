import useSettings from 'app/hooks/useSettings';

const ParentLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return <img src="/favicon.svg" width="24px" height="24px" className={className} />;
};

export default ParentLogo;
