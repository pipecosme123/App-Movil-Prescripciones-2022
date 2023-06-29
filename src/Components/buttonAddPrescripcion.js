export const buttonAddPrescripcion = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View style={style.btn_plus}>{children}</View>
    </TouchableOpacity>
  );
};
