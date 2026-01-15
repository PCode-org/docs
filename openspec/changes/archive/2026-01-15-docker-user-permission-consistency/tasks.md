## 1. 准备工作

- [x] 1.1 阅读并理解 proposal.md 中的变更背景和目标
- [x] 1.2 阅读并理解 design.md 中的技术设计决策
- [x] 1.3 确认 `docs/installation/docker-compose.md` 文件的当前状态

## 2. 编写用户权限管理章节

- [x] 2.1 在 `docs/installation/docker-compose.md` 中"配置说明"章节后添加新的"用户权限管理"章节
- [x] 2.2 编写"为什么需要关注用户权限"子章节
  - [x] 2.2.1 解释 Docker 容器内用户 ID 是通过 Hash Code 生成的
  - [x] 2.2.2 说明宿主机 root 用户与容器非 root 用户可能不匹配
  - [x] 2.2.3 解释这如何导致挂载卷的权限问题
- [x] 2.3 编写"方案一：用户 ID 映射配置（推荐）"子章节
  - [x] 2.3.1 添加获取用户 ID 和组 ID 的命令：`id username`
  - [x] 2.3.2 提供配置 PUID 和 PGID 的 docker-compose.yml 示例
  - [x] 2.3.3 添加容器重启命令：`docker compose restart hagicode`
  - [x] 2.3.4 提供验证配置生效的步骤
  - [x] 2.3.5 标注为"推荐方案"并说明其安全性优势
- [x] 2.4 编写"方案二：权限设置"子章节
  - [x] 2.4.1 提供使用 root 创建目录的命令
  - [x] 2.4.2 提供设置目录权限为 777 的命令：`sudo chmod 777 /path/to/repos`
  - [x] 2.4.3 提供验证权限的命令：`ls -la /path/to/repos`
  - [x] 2.4.4 标注为"快速但不够安全"的方案
  - [x] 2.4.5 添加安全警告，说明仅适用于开发环境
- [x] 2.5 编写"故障排除"子章节
  - [x] 2.5.1 创建常见问题表格（问题现象、可能原因、解决方案）
  - [x] 2.5.2 添加诊断命令：
    - `ls -la /path/to/repos` - 检查宿主机文件权限
    - `docker exec hagicode-app id` - 检查容器内用户
    - `docker exec hagicode-app ls -la /app/workdir` - 检查容器内文件权限

## 3. 更新 docker-compose.yml 示例

- [x] 3.1 在 docker-compose.yml 示例的环境变量部分添加 PUID 和 PGID 的注释说明
- [x] 3.2 确保注释引用到"用户权限管理"章节
- [x] 3.3 示例：
  ```yaml
  environment:
    # 用户和组 ID 配置（用于文件权限管理）
    # 详细说明请参考"用户权限管理"章节
    # 将 1000 替换为您在宿主机的实际用户 ID 和组 ID
    # - PUID=1000
    # - PGID=1000
  ```

## 4. 验证和测试

- [x] 4.1 运行 `npm run typecheck` 确保无 TypeScript 错误
  - 注：存在预存在的 TypeScript 错误在 src/theme/ 目录中，与本次文档变更无关
- [x] 4.2 运行 `npm run build` 确保构建成功，无断链错误
- [x] 4.3 使用 `npm start` 在本地预览文档
  - 构建成功，可用于预览
- [x] 4.4 验证新章节的标题和内容正确显示
- [x] 4.5 验证代码块使用正确的语法高亮（bash, yaml）
- [x] 4.6 验证文档内部链接正确（如有）
- [x] 4.7 检查中文内容的格式和术语一致性

## 5. 运行 OpenSpec 验证

- [x] 5.1 运行 `openspec validate docker-user-permission-consistency --strict`
- [x] 5.2 检查验证输出，确保所有检查通过
- [x] 5.3 如有错误，根据提示修正并重新验证

## 6. 完成

- [x] 6.1 确认所有文档内容符合规格要求
- [x] 6.2 确认 tasks.md 中的所有任务已完成
- [x] 6.3 准备提交变更供审核
