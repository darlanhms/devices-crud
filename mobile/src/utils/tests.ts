/* eslint-disable import/prefer-default-export */
interface NavigationProps {
  navigation: Partial<{
    navigate: () => void;
    goBack: () => void;
  }>;
  route: {
    params: any;
  };
}

export const createNavigationTestProps = (props?: Partial<NavigationProps>): any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...props,
});
