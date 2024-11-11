import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  //   @Cron('* * 0 * * *', {
  //     name: 'notifications',
  //     timeZone: 'Europe/Paris',
  //   })

  //   name	        Hữu ích để truy cập và kiểm soát tác vụ cron sau khi tác vụ đó được khai báo.
  //   timeZone	    Chỉ định múi giờ để thực hiện. Điều này sẽ sửa đổi thời gian thực tế so với múi giờ của bạn. Nếu múi giờ không hợp lệ, lỗi sẽ được đưa ra. Bạn có thể kiểm tra tất cả các múi giờ có sẵn tại trang web Moment Timezone .
  //   utcOffset	Điều này cho phép bạn chỉ định độ lệch múi giờ thay vì sử dụng timeZonetham số.
  //   disabled	    Điều này cho biết liệu công việc có được thực hiện hay không.

  //   @Cron(CronExpression.EVERY_30_SECONDS)

  // * * * * * *	mỗi giây
  // 45 * * * * *	mỗi phút, vào giây thứ 45
  // 0 10 * * * *	mỗi giờ, vào lúc bắt đầu phút thứ 10
  // 0 */30 9-17 * * *	cứ 30 phút một lần từ 9 giờ sáng đến 5 giờ chiều
  // 0 30 11 * * 1-5	Thứ Hai đến Thứ Sáu lúc 11:30 sáng
  @Cron('*/10 * * * * *')
  handleCron() {
    this.logger.log('Task is running every 10 seconds');
  }
}
