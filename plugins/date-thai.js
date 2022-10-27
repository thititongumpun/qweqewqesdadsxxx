export default ({ app }, inject) => {
  let month_thai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิยายน", "ธันวาคม"];
  inject('date_thai', date => {
    let d = new Date(date)
    return (("0" + d.getDate()).slice(-2) + " " + month_thai[d.getMonth()] +" " + (d.getFullYear() + 543))
  })
}