export class DateFormat {

  public static formatDate(oDate: Date): string {
    let sMonth: string | number = oDate.getMonth() + 1
    sMonth = sMonth < 10 ? '0' + sMonth : sMonth;
    const sDate = oDate.getDate() < 10 ? '0' + oDate.getDate() : oDate.getDate();
    return (oDate.getFullYear()) + "-" + sMonth + "-" + sDate;
  }

  public static formatTime(oDate: Date): string {
    const hours = oDate.getHours() < 10 ? '0' + oDate.getHours() : oDate.getHours();
    const minutes = oDate.getMinutes() < 10 ? '0' + oDate.getMinutes() : oDate.getMinutes();
    const seconds = oDate.getSeconds() < 10 ? '0' + oDate.getSeconds() : oDate.getSeconds();
    const strTime = hours + ":" + minutes + ":" + seconds;
    return strTime
  }

  /**
   * suggested function by Wolfgang. But this formats to IsoString which is normalized to UTC
   * with daylight savings
   */
  private _formatDate(oDate: Date): string {
    return oDate.toISOString().replace(/[-:]/g, '').slice(0, -5)
  }
}

