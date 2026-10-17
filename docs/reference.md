# 三张活地图作业参考样本：VLA 驱动的桌面整理机器人

> 制作于 2026-10-18。文献事实、样本设计、学习建议与尚未完成的实践明确区分。没有实际运行 VLA、制造机器人、完成真机测试或组织同学互评，不提供虚构成功率和多周经历。

## 一、选题与研究边界

我们研究视觉—语言—动作模型如何帮助固定桌面机械臂根据自然语言完成抓取和放置，希望同学看懂“观察—理解—策略—执行—反馈”的联系。典型任务是把笔放入笔筒、把积木放入盒子。主取向为 AI 工程师，兼顾科学家的证据比较与设计师的任务定义。暂不展开移动导航、危险物操作、任意家庭环境、从零训练大模型与商业部署。

典型任务：给定桌面场景与明确指令，机器人选择目标、抓取并放到正确容器。前沿主线是视觉语言预训练与机器人动作学习的连接；新生重点看懂整体、关系、依据和后续学习入口。

## 二、领域地图

连接视觉、语言、策略、执行、数据、工具与学习入口。

### 桌面整理任务｜把一句指令变成可检验目标

性质：样本场景设计。

含义：让固定桌面机械臂根据指令，把笔放进笔筒、积木放进盒子。目标物、容器和完成条件都要明确。

作用与依据：边界足够小，可以同时观察感知、决策、控制和交互。

例子 / 判断：初始状态：一支笔、两块积木和两个容器；完成条件：目标物进入指定容器，未碰倒其他物体。

限制 / 疑问：这是拟议的应用任务，尚未制造、训练或真机验证；不包含移动底盘、危险物和任意家庭环境。

学习基础：先写清输入、输出、失败和需要人确认的情况。

下一步：用纸面流程或授权视频标注开始，不必先买机械臂。

引用：[R20](assignment.txt)

### 视觉感知｜看到物体，也要看见状态

性质：文献机制概括。

含义：从图像中取得物体、位置和遮挡线索；一些 VLA 用视觉表示直接条件化策略，不一定显式输出检测框。

作用与依据：回答“看到了什么”和“现在能否可靠操作”。

例子 / 判断：两支相似的笔同时出现时，识别到“笔”还不足以选中用户指的那一支。

限制 / 疑问：照明、遮挡和相机变化可能影响观察；不能凭语言理解推定定位准确。

学习基础：图像、坐标、基本编程；专业视觉课程属于后续学习。

下一步：先在 10 张自采或授权图片上标目标和遮挡，不伪造模型识别结果。

引用：[R01](https://arxiv.org/abs/2406.09246v3)、[R02](https://arxiv.org/abs/2307.15818v1)、[R11](https://huggingface.co/blog/smolvla)

### 语言与目标对应｜用户说的，是哪个物体？

性质：论文支持 + 样本解释。

含义：把自然语言指令与场景中的对象、容器及空间关系联系起来，这常被称为语言 grounding。

作用与依据：视觉中有多个对象，指令决定当前任务该关注哪一个。

例子 / 判断：“把红色积木放进左边盒子”需要同时对应颜色、物体和空间关系。

限制 / 疑问：“帮我收拾一下”可能有歧义；本样本不假定模型能读懂每个人的整理习惯。

学习基础：能区分物体属性、任务目标和参照坐标。

下一步：记录 5 条明确指令和 5 条有歧义的指令，写出何时需要追问。

引用：[R01](https://arxiv.org/abs/2406.09246v3)、[R02](https://arxiv.org/abs/2307.15818v1)

### 坐标与标定｜相机看到的位置怎样变成动作

性质：教材支持 + 样本解释。

含义：相机、机械臂基座和夹爪使用不同坐标系。几何路线通常需要变换与标定；学习策略也依赖训练与部署的传感器、动作约定。

作用与依据：避免把图像像素直接当成机械臂空间位置。

例子 / 判断：画出相机、基座和夹爪三个坐标系，解释同一个点的表达为什么不同。

限制 / 疑问：VLA 不意味着所有实现都要显式插入同一标定模块，也不意味着物理坐标约定可以忽略。

学习基础：向量、矩阵、刚体变换；可先看直观图示。

下一步：阅读 Modern Robotics 第 3 章，做二维旋转与平移的小练习。

引用：[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)、[R09](https://github.com/openvla/openvla)

### VLA 模型｜视觉 + 语言 → 动作

性质：原始论文支持。

含义：用视觉观察和语言任务条件预测机器人动作。RT-2、OpenVLA、π0 与 SmolVLA 是不同研究路线的代表，不是同一个模型的四个名字。

作用与依据：把大规模多模态预训练与机器人操作联系起来，是本选题的前沿技术主线。

例子 / 判断：在桌面整理中，模型尝试根据当前图像和“把笔放进笔筒”输出动作表示。

限制 / 疑问：论文展示有实验边界，部署仍需核对机器人、动作空间和相机；本页没有执行这些模型。

学习基础：理解输入输出、示范数据和闭环；细节推导可留待以后。

下一步：先阅读模型结构图，说明它输出的是动作 token、连续动作还是动作片段。

引用：[R01](https://arxiv.org/abs/2406.09246v3)、[R02](https://arxiv.org/abs/2307.15818v1)、[R03](https://arxiv.org/abs/2410.24164v4)、[R04](https://arxiv.org/abs/2506.01844)

### 模仿学习与动作表示｜从示范轨迹学习怎样做

性质：论文支持。

含义：利用示范中的观察与动作学习策略。动作可以用不同形式表示；扩散或流匹配等生成方式与“是否使用语言条件”是不同维度。

作用与依据：理解模型为什么需要机器人示范，而不是只读文字就自然获得操作技能。

例子 / 判断：示范不只有成功抓起的一帧，还包括观察、夹爪状态与动作序列。

限制 / 疑问：数据质量、覆盖和分布变化会影响结果；不能把示范数量当作唯一质量指标。

学习基础：训练与推理、样本与标签的基本区别。

下一步：比较 Diffusion Policy 与 π0 的输出和任务条件，不直接比较不一致测试中的百分比。

引用：[R05](https://arxiv.org/abs/2303.04137)、[R03](https://arxiv.org/abs/2410.24164v4)、[R06](https://arxiv.org/abs/2310.08864v9)

### 执行与闭环反馈｜做一步，再看结果

性质：文献机制 + 设计建议。

含义：策略输出动作后，由实际控制系统执行，并根据新的观察继续判断。规划、动作块、反馈和故障处理如何组合，要看具体系统。

作用与依据：物体滑动、夹取失败和环境变化可能使原计划失效。

例子 / 判断：夹爪闭合后目标仍在桌上，应识别失败并重试、停机或交给人处理。

限制 / 疑问：闭环也会受延迟和传感器误差影响；这不是本样本验证过的恢复能力。

学习基础：区分目标、轨迹、控制命令和观察反馈。

下一步：画出观察 → 策略 → 执行 → 再观察的环，并标出可能的延迟。

引用：[R03](https://arxiv.org/abs/2410.24164v4)、[R04](https://arxiv.org/abs/2506.01844)、[R14](https://design.ros2.org/articles/actions.html)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)

### 机械臂与夹爪｜能力也受物理条件约束

性质：官方硬件资料 + 样本分析。

含义：相机、关节、夹爪和计算设备共同限定工作空间与操作方式。SO-101 文档可作为理解组装、校准和记录示范的入口。

作用与依据：解释为什么“模型能理解”不等于“设备一定抓得住”。

例子 / 判断：笔太细、夹爪开口不合适或目标在工作空间外，都可能造成失败。

限制 / 疑问：没有采购、价格评估或安全验证；本样本不提供真机运动指令。

学习基础：自由度、工作空间和末端执行器的基本含义。

下一步：先查实验室现有设备，记录夹爪、相机和动作接口，再考虑模型适配。

引用：[R13](https://huggingface.co/docs/lerobot/so101)、[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)

### ROS 2 / MoveIt / LeRobot｜不同工具承担不同职责

性质：官方文档支持。

含义：ROS 2 组织组件通信；MoveIt 提供运动规划等能力；LeRobot 提供机器人学习相关数据与训练工具。它们不是必须全部串联的固定配方。

作用与依据：把学习策略、运动规划和消息接口分清，避免堆工具名称。

例子 / 判断：模块化路线可以用 MoveIt 规划目标位姿；学习路线可从 LeRobot 的适配示例理解数据流。

限制 / 疑问：并非每个 VLA 都依赖 ROS 2 或 MoveIt；碰撞检查也不等于完整物理安全保障。

学习基础：Python、日志、接口与模块职责。

下一步：先选一个框架读最小示例，写清它输入什么、输出什么、没有负责什么。

引用：[R12](https://github.com/huggingface/lerobot)、[R14](https://design.ros2.org/articles/actions.html)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)

### 示范数据与基准｜机器人经验从哪里来

性质：论文支持。

含义：Open X-Embodiment 汇聚跨机器人数据；LIBERO 提供受控任务套件。数据用于学习，基准用于限定条件下的比较，两者不能混为一谈。

作用与依据：把模型能力和数据来源、测试条件连起来。

例子 / 判断：比较模型前先确认是否同一机器人、同一任务与同一训练数据。

限制 / 疑问：不同数据集的授权、动作格式与相机条件需核对；本样本没有下载数据或运行基准。

学习基础：会阅读数据说明，理解训练集和测试集的区别。

下一步：挑一条公开轨迹看观察、动作和任务字段，记录与桌面任务的差异。

引用：[R06](https://arxiv.org/abs/2310.08864v9)、[R07](https://arxiv.org/abs/2306.03310)

### 评价与失败分类｜完成任务，而不只是抓起来

性质：文献分析 + 样本指标设计。

含义：分别记录选对物体、抓取、放置、任务完成、人工介入和不良事件；同时记录条件与尝试次数。

作用与依据：只展示最好的一段视频，会遗漏失败、重试和任务边界。

例子 / 判断：“抓起笔”但放错容器，应算任务失败；抓取成功率和完整任务成功率分开报。

限制 / 疑问：没有本组真机数据，因此本页不给机器人成功率；模拟排名也不能直接外推到现实。

学习基础：清楚定义分子、分母、条件和失败类型。

下一步：制定固定测试清单，并保留每次输入、输出、视频与失败原因。

引用：[R01](https://arxiv.org/abs/2406.09246v3)、[R07](https://arxiv.org/abs/2306.03310)、[R20](assignment.txt)

### 课程与能力路径｜从一个困难反查学习入口

性质：公开资料已核查 / 本校待核实。

含义：用编程基础、机器人运动学与操作课程支持后续探索。这里提供真实公开学习入口，不把它们冒充你们学校的培养方案。

作用与依据：将培养要求 → 能力 → 课程内容 → 概念工具 → 实践连接起来。

例子 / 判断：调试日志困难 → 文件与字典处理 → CS106A 大纲 → 记录一次任务状态。

限制 / 疑问：本校专业、年级、课程名与覆盖类型尚未核实；未来课程不是本作业先修要求。

学习基础：先能解释任务，再逐步补知识。

下一步：取得本校培养方案和课程大纲，标前置基础、核心覆盖、部分涉及、实践应用或自主拓展。

引用：[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)、[R17](https://ocw.mit.edu/courses/6-4210-robotic-manipulation-fall-2022/)、[R18](https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1224/handouts_w2021/syllabus-cs106a.html)、[R20](assignment.txt)

## 三、生态地图

论文、模型、开源社区、数据协作与应用条件；具体关系带来源。

### OpenVLA 作者团队｜连接开放模型、数据与适配

性质：发表时来源支持。

含义：Moo Jin Kim、Karl Pertsch 等作者公开模型与研究资料。项目页列出发表时的多机构署名。

作用与依据：以一项可阅读、可查代码的代表工作连接模型、示范和迁移问题。

例子 / 判断：从 OpenVLA 模型节点跳到原论文，再检查所用数据与任务。

限制 / 疑问：按发表时归属理解，不推断作者当前任职；不把共同署名说成商业采购或独家合作。

学习基础：先读摘要、模型图和实验条件。

下一步：阅读项目页的不同任务对照，找出结论成立的边界。

引用：[R01](https://arxiv.org/abs/2406.09246v3)、[R08](https://openvla.github.io/)、[R09](https://github.com/openvla/openvla)

### RT-2 研究团队｜视觉语言知识向控制迁移

性质：原始论文支持。

含义：Anthony Brohan 等作者提出 RT-2，研究把视觉语言任务与机器人动作学习联系起来。

作用与依据：帮助解释 VLA 为什么出现，以及语言理解和执行怎样在模型中连接。

例子 / 判断：把动作表示为 token 是其方法线索之一，可以与连续动作路线比较。

限制 / 疑问：2023 年结果不是任意平台即插即用的承诺；不把演示中能力泛化到所有场景。

学习基础：区分研究模型和可部署产品。

下一步：检查训练条件、动作表示、评价任务和公开可获得性。

引用：[R02](https://arxiv.org/abs/2307.15818v1)

### Physical Intelligence｜π0 / openpi

性质：原始论文 / 官方仓库支持。

含义：π0 探索连续动作生成；openpi 是研究策略与工程示例的公开入口。

作用与依据：展示企业如何同时参与模型研究和代码开放。

例子 / 判断：通过论文与仓库定位动作专家、数据接口与适配条件。

限制 / 疑问：不声称本项目与该公司合作，也不依据演示推测商业收入或实际购买意愿。

学习基础：理解模型骨干、动作输出和设备适配。

下一步：对照 π0 论文与仓库，记录同名不同版本的区别。

引用：[R03](https://arxiv.org/abs/2410.24164v4)、[R10](https://github.com/Physical-Intelligence/openpi)

### Hugging Face / LeRobot｜模型、数据与硬件社区入口

性质：官方资料支持。

含义：SmolVLA 与 LeRobot 把紧凑策略、社区数据和可配置硬件联系起来。

作用与依据：帮助新生从可见的数据与工具入口进入机器人学习。

例子 / 判断：先看一条记录示范的数据格式，再追到对应训练和硬件配置。

限制 / 疑问：开源不等于零成本，也不保证任意笔记本都能完成所有训练。

学习基础：先核对硬件、模型与数据格式。

下一步：查具体模型卡和适配文档，不根据模型名字直接选设备。

引用：[R04](https://arxiv.org/abs/2506.01844)、[R11](https://huggingface.co/blog/smolvla)、[R12](https://github.com/huggingface/lerobot)、[R13](https://huggingface.co/docs/lerobot/so101)

### Open X-Embodiment｜跨机构共享机器人经验

性质：原始论文支持。

含义：合作研究把不同机器人的数据整理为可研究的跨具身资源。

作用与依据：说明一个团队难以独自覆盖所有机器人、任务和环境。

例子 / 判断：OpenVLA 使用相关数据；跨平台经验是否能迁移要通过任务验证。

限制 / 疑问：跨具身不能理解为消除硬件差异，仍需处理动作和观察约定。

学习基础：区分数据贡献、模型使用和商业关系。

下一步：沿原论文追数据来源，并核对具体子集引用与许可。

引用：[R06](https://arxiv.org/abs/2310.08864v9)、[R01](https://arxiv.org/abs/2406.09246v3)

### LIBERO 研究社区｜让迁移比较有共同任务

性质：原始论文支持。

含义：LIBERO 围绕机器人终身学习与知识迁移组织任务和评价资源。

作用与依据：同一套条件有助于解释“在哪种变化下效果改变”。

例子 / 判断：改变空间布局或任务组合时，关注迁移与遗忘，而不是只报一个总分。

限制 / 疑问：仿真任务与真实桌面存在差距；本样本没有运行 LIBERO。

学习基础：理解受控比较与训练测试隔离。

下一步：读任务套件和划分方式，设计本项目自己的小测试清单。

引用：[R07](https://arxiv.org/abs/2306.03310)

### 研究入口与会议｜从论文追到持续更新渠道

性质：重要会议入口 / 目录类别待核实。

含义：以 CoRL 和 RSS 等机器人研究渠道追踪问题；π0 的 arXiv 页面标注 RSS 2025。

作用与依据：先看研究对象、方法与限制，再用会议和仓库订阅线索。

例子 / 判断：新论文先作为待核实线索，成员读原文后再改地图。

限制 / 疑问：CCF 具体类别需按明确目录版本核对；已找到 2022 更名版入口，正文未完整读取，不能自行标 A 类。

学习基础：会区分正式论文、预印本、附录和项目演示。

下一步：补齐教师要求的会议目录条目、核查人和日期。

引用：[R19](https://www.robot-learning.org/)、[R03](https://arxiv.org/abs/2410.24164v4)、[R22](https://www.ccf.org.cn/Academic_Evaluation/By_category/2024-06-28/825349.shtml)

### 从实验到实际使用｜谁使用、谁维护、谁承担成本

性质：样本推断 / 待调研。

含义：本样本设想实验室或教育场景先验证桌面整理。设备、示范采集、计算与维护都需要投入。

作用与依据：解释研究成果进入应用还缺哪些条件，不把技术可行当成需求成立。

例子 / 判断：用户提出整理规则；维护者标注资料与故障；开发者适配设备。这些是拟议职责。

限制 / 疑问：没有用户访谈、采购合同或成本报价；未证实机构之间的商业关系。

学习基础：区分使用者、决策者和付费者。

下一步：访谈实际使用者，询问最费时步骤、可接受失败和维护责任。

引用：[R12](https://github.com/huggingface/lerobot)、[R13](https://huggingface.co/docs/lerobot/so101)、[R20](assignment.txt)

## 四、认知地图

问题定义、系统拆解、条件化对照与多目标取舍。

### 问题定义｜整理的标准由谁决定？

性质：样本案例分析。

含义：具体问题：用户说“收拾桌面”，机器人该把什么放到哪里？方法是把笼统要求变成可观察的目标与例外。

作用与依据：依据：指令条件会影响策略；作业要求典型任务和明确边界。

例子 / 判断：当前判断：先定义目标物、容器和完成条件；若容器归属不清，应确认而不是自行猜测。

限制 / 疑问：尚存疑问：真实用户是否愿意提前定义规则？没有访谈，不宣称已验证需求。

学习基础：理解任务目标和交互需求。

下一步：请同学独立描述同一场景，比较各自认为“整理好”的标准。

引用：[R02](https://arxiv.org/abs/2307.15818v1)、[R20](assignment.txt)

### 系统观：故障定位｜看对了，为什么仍抓不住？

性质：文献支持的诊断框架。

含义：具体问题：选中了正确的笔却未抓起。把失败拆为视觉定位、坐标约定、动作预测、控制延迟和夹爪接触。

作用与依据：依据：运动学、规划约束和硬件工作空间是不同层次；单改语言指令未必触及原因。

例子 / 判断：当前判断：先看对应日志与观察，再定位环节；不能凭一次失败就认定模型不够大。

限制 / 疑问：这是一种排查框架，未实际诊断真机；没有测量，不能断定失败原因。

学习基础：画清观察、策略、控制与执行闭环。

下一步：记录故障发生前后状态，用证据逐个排除可能原因。

引用：[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)、[R13](https://huggingface.co/docs/lerobot/so101)

### 对照比较与反例｜通用模型一定更好吗？

性质：已阅读的项目对照分析。

含义：具体问题：是否应直接用 VLA 替代所有专用策略？方法是按相同任务与条件阅读对照，而不只看模型规模。

作用与依据：OpenVLA 项目页区分窄任务和多对象语言条件任务，并展示不同策略表现不一致。

例子 / 判断：当前判断：方法优势有任务条件；应按任务、设备、数据与目标评价，不能把一个总体结果外推到所有操作。

限制 / 疑问：未复现实验，不能据此宣称我们桌面任务上哪个模型更好；演示也不能代表全部失败分布。

学习基础：理解可比较条件与反例。

下一步：记录论文比较条件、任务类别和例外，再设计本地小测试。

引用：[R08](https://openvla.github.io/)、[R01](https://arxiv.org/abs/2406.09246v3)、[R05](https://arxiv.org/abs/2303.04137)

### 多目标取舍｜精度、延迟、算力与维护

性质：文献分析 + 方案建议。

含义：具体问题：选择模块化方案、较大 VLA 还是紧凑 VLA？比较任务变化、数据条件、诊断成本与控制响应。

作用与依据：SmolVLA 讨论紧凑模型与异步推理；几何规划和学习策略解决的层次并不完全相同。

例子 / 判断：当前判断：先用可解释的小任务基线定位需求，再评价语言泛化带来的收益及适配代价。

限制 / 疑问：没有同设备延迟与费用实测，不宣布某模型最快、最便宜或最佳。

学习基础：区分控制频率、推理耗时和完整任务耗时。

下一步：固定设备、相机、问题与示范预算，记录所有选择依据。

引用：[R04](https://arxiv.org/abs/2506.01844)、[R11](https://huggingface.co/blog/smolvla)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)

### 发展观：路线怎样演进｜从专门示教到预训练适配

性质：文献事实 + 样本解释。

含义：专门策略、跨机器人数据与视觉语言预训练回应不同的泛化与数据难题；新路线也继承物理执行的约束。

作用与依据：RT-2、Open X-Embodiment、OpenVLA 与 π0 可作为理解问题变化的代表入口，而非唯一历史分期。

例子 / 判断：当前判断：前沿性不只是参数变大，还包括知识、数据与动作如何连接，以及能否适配新任务。

限制 / 疑问：课堂第三个“观”未在作业原文中明确，须以授课内容核实；这条时间线不代表完整领域史。

学习基础：分清方法提出时的条件与现在的部署条件。

下一步：比较两篇论文要解决的旧限制及其新增限制。

引用：[R02](https://arxiv.org/abs/2307.15818v1)、[R06](https://arxiv.org/abs/2310.08864v9)、[R01](https://arxiv.org/abs/2406.09246v3)、[R03](https://arxiv.org/abs/2410.24164v4)、[R20](assignment.txt)

### 成长与共同审图｜把未知变成下一步行动

性质：可执行计划 / 待本组实践。

含义：科学家取向追问证据与反例，工程师记录接口与故障，设计师观察需求与可控性。三条路线可以交叉。

作用与依据：每周共同解释一条连线、核查一个来源、复盘一个问题，再把真实反馈转成修改。

例子 / 判断：本次样本已核查来源并整理文献对照；小组后续应保存真实尝试和各自贡献。

限制 / 疑问：没有虚构成员、同学反馈、真机成功率或多周学习经历；不能代替学生理解与实践。

学习基础：能用自己的话解释一个概念和一条关系。

下一步：从一条授权轨迹或明确的纸面流程开始，逐周增加证据。

引用：[R20](assignment.txt)

## 五、三个分析案例

### C1 选对了笔，却没有抓起

具体问题：识别正确后仍失败，是否应该直接换更大的模型？

方法：系统拆解

依据与比较：运动学与规划资料区分坐标、约束、轨迹和硬件能力。没有日志时，多种环节都可能解释相同表象。

当前判断：先检查观察、坐标约定、动作接口与夹爪状态，再判断是否需要改模型。

尚存疑问：没有真机和测量数据，不能断言哪一环节是实际原因。

来源：[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)、[R13](https://huggingface.co/docs/lerobot/so101)

### C2 VLA 应该替代所有专用策略吗？

具体问题：通用模型在某个总体比较中更好，是否能推出每项桌面操作都更好？

方法：对照与反例

依据与比较：OpenVLA 项目页分别呈现窄任务与多对象语言条件任务中的对照，存在不同方法各有优势的情况。

当前判断：论文结论要带任务和适配条件；不能拼接不同设置的数字给模型排名。

尚存疑问：本样本尚未在同一机械臂、同一数据预算和同一任务上复现对照。

来源：[R08](https://openvla.github.io/)、[R01](https://arxiv.org/abs/2406.09246v3)、[R05](https://arxiv.org/abs/2303.04137)

### C3 模型小一点，是否就能实时工作？

具体问题：较小模型是否自动意味着整体系统更快、更适合我们的设备？

方法：多目标取舍

依据与比较：SmolVLA 将紧凑策略与异步推理放在同一系统讨论；动作执行、相机采样和通信也影响响应。

当前判断：分别测推理时间与端到端任务时间，记录硬件和控制接口；不能只按参数量选型。

尚存疑问：没有本机推理或真机延迟实测；当前只能给出比较设计。

来源：[R04](https://arxiv.org/abs/2506.01844)、[R11](https://huggingface.co/blog/smolvla)、[R14](https://design.ros2.org/articles/actions.html)

### 文献阅读后的判断细化

将“通用模型应该全面更好”作为需要检查的宽泛说法，而非虚构本组曾经持有的信念。阅读 OpenVLA 项目页针对窄任务和语言条件多任务的对照后，样本将结论收窄为：优势依赖任务、设备、数据与适配条件，不能按单个总体指标替代本地测试。

[R08](https://openvla.github.io/)、[R01](https://arxiv.org/abs/2406.09246v3)、[R05](https://arxiv.org/abs/2303.04137)

## 六、课程关联与三条成长路线

未获得本校培养方案和大纲，以下只提供真实公开资源及样本能力链；本校对应、覆盖类型和适用年级待核实。未来课程不是本作业的先修要求。

- 数理与系统基础（本校要求待核实） → 解释坐标变换与可达空间 → Modern Robotics 教材与配套视频（刚体变换、运动学、轨迹生成） → 坐标与标定 / 控制 → 画相机、基座、夹爪坐标系，做二维变换。定位：公开学习资源；自主拓展；本校对应待核实。[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)

- 工程实现能力（本校要求待核实） → 读写状态、接口和日志 → CS106A: Programming Methodology（Python、函数、字典、文件处理与调试） → 数据记录 / 工具接口 → 把一次拟议任务分为状态并保存日志。定位：真实公开课；前置基础入口；本校对应待核实。[R18](https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1224/handouts_w2021/syllabus-cs106a.html)

- 智能系统与研究能力（本校要求待核实） → 理解机器人操作中的感知、规划与学习问题 → MIT 6.4210: Robotic Manipulation（机器人操作课程介绍及配套学习材料） → 机器人操作 / 学习与评价 → 读一个操作案例，说明观察、动作与测试条件。定位：真实公开课；自主拓展；不是本作业先修条件。[R17](https://ocw.mit.edu/courses/6-4210-robotic-manipulation-fall-2022/)

科学家取向：追问解释、比较同条件证据并保留反例。工程师取向：画数据流，检查接口、执行、反馈与故障。设计师取向：观察用户如何定义“整理好”，设计确认、介入与反馈。三者可交叉，本样本以工程师取向为主。

课堂认识方法：系统观用于拆解失败环节，发展观用于理解预训练、跨具身数据与动作生成的问题演进。第三个“观”需按课堂核实，不自行猜测。

## 七、三图关系清单

连线分别标论文事实、官方事实、概念关系、学习建议、方案分析和样本推断；拟议工程关系不当作真实合作。

- 桌面整理任务 → **定义指令与目标** → 语言与目标对应（设计关系；[R20](assignment.txt)）。

- 视觉感知 → **提供场景观察** → 语言与目标对应（概念关系；[R02](https://arxiv.org/abs/2307.15818v1)）。

- 视觉感知 → **提供视觉条件** → VLA 模型（论文事实；[R01](https://arxiv.org/abs/2406.09246v3)）。

- 语言与目标对应 → **提供语言任务条件** → VLA 模型（论文事实；[R02](https://arxiv.org/abs/2307.15818v1)）。

- 坐标与标定 → **约定空间表达** → 执行与闭环反馈（教材关系；[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)）。

- 模仿学习与动作表示 → **连接示范与策略学习** → VLA 模型（论文事实；[R01](https://arxiv.org/abs/2406.09246v3)）。

- VLA 模型 → **输出待执行动作** → 执行与闭环反馈（论文事实；[R03](https://arxiv.org/abs/2410.24164v4)）。

- 执行与闭环反馈 → **新的观察形成闭环** → 视觉感知（机制关系；[R04](https://arxiv.org/abs/2506.01844)）。

- 机械臂与夹爪 → **约束可执行动作** → 执行与闭环反馈（工程关系；[R13](https://huggingface.co/docs/lerobot/so101)、[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)）。

- ROS 2 / MoveIt / LeRobot → **提供通信或规划工具** → 执行与闭环反馈（可选工程关系；[R14](https://design.ros2.org/articles/actions.html)、[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)）。

- 示范数据与基准 → **提供示范资源** → 模仿学习与动作表示（论文事实；[R06](https://arxiv.org/abs/2310.08864v9)）。

- 示范数据与基准 → **提供受控基准入口** → 评价与失败分类（论文事实；[R07](https://arxiv.org/abs/2306.03310)）。

- 评价与失败分类 → **核对完成条件** → 桌面整理任务（指标设计；[R20](assignment.txt)）。

- 课程与能力路径 → **提供运动学学习入口** → 坐标与标定（学习建议；[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)）。

- 课程与能力路径 → **提供编程学习基础** → ROS 2 / MoveIt / LeRobot（学习建议；[R18](https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1224/handouts_w2021/syllabus-cs106a.html)）。

- 课程与能力路径 → **提供操作研究入口** → 模仿学习与动作表示（学习建议；[R17](https://ocw.mit.edu/courses/6-4210-robotic-manipulation-fall-2022/)）。

- OpenVLA 作者团队 → **发布代表性开放模型** → VLA 模型（论文事实；[R01](https://arxiv.org/abs/2406.09246v3)、[R09](https://github.com/openvla/openvla)）。

- OpenVLA 作者团队 → **使用相关数据** → Open X-Embodiment（论文事实；[R01](https://arxiv.org/abs/2406.09246v3)）。

- RT-2 研究团队 → **研究 RT-2 路线** → VLA 模型（论文事实；[R02](https://arxiv.org/abs/2307.15818v1)）。

- Physical Intelligence → **研究 π0 路线** → VLA 模型（论文事实；[R03](https://arxiv.org/abs/2410.24164v4)）。

- Hugging Face / LeRobot → **提供 SmolVLA 入口** → VLA 模型（论文事实；[R04](https://arxiv.org/abs/2506.01844)、[R11](https://huggingface.co/blog/smolvla)）。

- Hugging Face / LeRobot → **提供 LeRobot 工具** → ROS 2 / MoveIt / LeRobot（官方事实；[R12](https://github.com/huggingface/lerobot)）。

- Hugging Face / LeRobot → **提供 SO-101 配置文档** → 机械臂与夹爪（官方事实；[R13](https://huggingface.co/docs/lerobot/so101)）。

- Open X-Embodiment → **组织跨机器人数据** → 示范数据与基准（论文事实；[R06](https://arxiv.org/abs/2310.08864v9)）。

- LIBERO 研究社区 → **提供迁移任务基准** → 示范数据与基准（论文事实；[R07](https://arxiv.org/abs/2306.03310)）。

- Physical Intelligence → **开放 openpi 示例** → ROS 2 / MoveIt / LeRobot（官方事实；[R10](https://github.com/Physical-Intelligence/openpi)）。

- 研究入口与会议 → **追到 π0 的发表记录** → Physical Intelligence（文献事实；[R03](https://arxiv.org/abs/2410.24164v4)）。

- 从实验到实际使用 → **设备投入影响使用条件** → 机械臂与夹爪（样本推断；[R13](https://huggingface.co/docs/lerobot/so101)）。

- 从实验到实际使用 → **示范采集需要投入** → 示范数据与基准（样本推断；[R12](https://github.com/huggingface/lerobot)）。

- 问题定义 → **明确完成标准** → 桌面整理任务（样本分析；[R20](assignment.txt)）。

- 问题定义 → **区分歧义与明确指令** → 语言与目标对应（样本分析；[R02](https://arxiv.org/abs/2307.15818v1)）。

- 系统观：故障定位 → **定位执行与反馈问题** → 执行与闭环反馈（诊断建议；[R15](https://moveit.picknik.ai/main/doc/concepts/motion_planning.html)）。

- 系统观：故障定位 → **检查空间约定** → 坐标与标定（诊断建议；[R16](https://modernrobotics.northwestern.edu/nu-gm-book-resource/)）。

- 系统观：故障定位 → **检查物理能力边界** → 机械臂与夹爪（诊断建议；[R13](https://huggingface.co/docs/lerobot/so101)）。

- 对照比较与反例 → **阅读条件化对照** → OpenVLA 作者团队（文献分析；[R08](https://openvla.github.io/)）。

- 对照比较与反例 → **限定公平比较条件** → 评价与失败分类（方法建议；[R07](https://arxiv.org/abs/2306.03310)）。

- 多目标取舍 → **比较收益与适配代价** → VLA 模型（方案分析；[R04](https://arxiv.org/abs/2506.01844)）。

- 多目标取舍 → **连接资源和维护约束** → 从实验到实际使用（样本推断；[R12](https://github.com/huggingface/lerobot)）。

- 发展观：路线怎样演进 → **追溯预训练与控制结合** → RT-2 研究团队（文献分析；[R02](https://arxiv.org/abs/2307.15818v1)）。

- 发展观：路线怎样演进 → **追溯跨具身数据协作** → Open X-Embodiment（文献分析；[R06](https://arxiv.org/abs/2310.08864v9)）。

- 成长与共同审图 → **从问题反查学习缺口** → 课程与能力路径（行动建议；[R20](assignment.txt)）。

- 成长与共同审图 → **主动保存反例** → 对照比较与反例（行动建议；[R20](assignment.txt)）。

- 问题定义 → **把问题拆成系统环节** → 系统观：故障定位（分析流程；[R20](assignment.txt)）。

- 系统观：故障定位 → **用对照支持原因判断** → 对照比较与反例（分析流程；[R20](assignment.txt)）。

- 对照比较与反例 → **据条件进行选型** → 多目标取舍（分析流程；[R08](https://openvla.github.io/)）。

- 发展观：路线怎样演进 → **新证据触发更新** → 成长与共同审图（行动建议；[R20](assignment.txt)）。

## 八、地图相关 AI 的真实实现

75 条标注短句训练浏览器内的多项式朴素贝叶斯，识别五类问题意图；名称与字符相似度检索节点，答案由已有地图字段摘录并返回引用。网页助手不是 VLA 模型，不控制机器人，不联网查新，不生成文献之外的事实。无依据时说明未知，本校课程未知时拒绝确认。若教师要求大模型接口，需另接服务端并核查输出；GitHub Pages 不保存模型密钥。

[R21](https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html)、[R20](assignment.txt)

## 九、持续更新、互评与贡献

每周流程：新论文、仓库更新、试验或同学反馈 → 待核实线索 → 读原文或实际验证 → 修改节点和关系 → 留下日期、对象、依据、内容和原因 → 更新仓库 → 发布并验证访问。没有新变化可记录检查结果，不为增加数量而更新。

- 2026-10-18｜样本主题与三图主线｜依据：用户明确选择机器人应用；R01–R22｜修改：围绕桌面整理重建节点、关系、案例与课程入口，区分文献和拟议实践。｜原因：让三图共同解释一个具体前沿应用。

- 2026-10-18｜方案判断与文献引用｜依据：R08 条件化对照；R01、R05｜修改：将“通用模型优势”限定在对应任务与比较条件，增加窄任务反例和文献定位。｜原因：避免把某项实验的优势外推到所有机器人任务。

节点修改、日志和反馈保存在当前浏览器，可导出 JSON；不同设备不会自动同步。维护者需汇总、核实并修改 data.js 后发布。

至少 3 名非本组同学独立浏览：解释一个概念、一个生态关系和一个分析案例。反馈记录：日期、代号、对象、原意见、核实过程、具体修改或暂缓、理由。开发测试和 AI 意见不计作同学互评。

- 内容统筹：共同解释任务主线，核对三图术语与关系。 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。

- 文献核查：核对作者、版本、结论条件和引用定位。 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。

- 课程关联：取得本校培养方案及课程大纲，保留证据。 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。

- 开发与验证：维护交互、地图助手、发布和故障记录。 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。

- 体验与互评：组织独立浏览，记录反馈核实与处理。 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。

## 十、七周计划（待本组执行）

- 第 1 周｜确定任务与边界：明确目标物、容器、完成条件、分工和主取向。

- 第 2 周｜领域与课程核查：完成知识工具主线；取得本校大纲。

- 第 3 周｜生态与案例：核查论文、工具、数据关系；部署初版。

- 第 4 周｜中期独立互评：请至少 3 名非本组同学浏览、复述并反馈。

- 第 5 周｜按证据修订：修改节点和连线；检查地图问答与来源。

- 第 6 周｜深化与再使用：补真实尝试和失败分析；再次独立浏览。

- 第 7 周｜展示与交接：提交网址、更新、贡献、未知与后续入口。

## 十一、8 分钟展示提纲

1 分钟说选题与边界；3 分钟沿 VLA → OpenVLA → 对照反例 → 评价 → 课程探索三图；2 分钟演示地图问答与本组真实修改；1 分钟说明一次有证据的认识细化；1 分钟说明未知与后续入口。

## 十二、尚需真实补充

- 本校专业、年级培养方案与课程覆盖；课堂第三个“观”。

- CCF 指定版本目录中具体会议类别。

- 真实桌面资料、设备适配、成功率、延迟与失败分布。

- 至少 3 名非本组同学的独立反馈与处理。

- 持续多周的更新、认识变化与真实成员贡献。

- GitHub 发布后的免登录、校园网与手机网络访问情况。

## 十三、GitHub 发布

解压后将里面的 docs 文件夹直接上传到仓库根目录。在 Settings → Pages 选择 Deploy from a branch → main → /docs → Save。不要把外层发布包目录再套在 docs 上方。自动工作流是可选方案。以 GitHub 实际显示网址为准，必须再做免登录和国内网络访问检查。

## 十四、参考文献

# 参考文献与出处

核查日期：2026-10-18。以下为原始论文、官方项目、教材或用户提供原文。预印本保留 arXiv 标识；不虚构卷期页码。

## R01 · OpenVLA: An Open-Source Vision-Language-Action Model

[R01] Kim M J, Pertsch K, Karamcheti S, et al.. OpenVLA: An Open-Source Vision-Language-Action Model[EB/OL]. 2024. [2026-10-18]. https://arxiv.org/abs/2406.09246v3

- 原文定位：arXiv:2406.09246v3；摘要、模型与实验

- 支持范围：支持 VLA、机器人示范和适配的机制说明；不是本样本实测。

- 类型：论文

## R02 · RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control

[R02] Brohan A, Brown N, Carbajal J, et al.. RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control[EB/OL]. 2023. [2026-10-18]. https://arxiv.org/abs/2307.15818v1

- 原文定位：arXiv:2307.15818v1；方法与评价

- 支持范围：支持把动作表示为 token 并联合训练的研究路线。

- 类型：论文

## R03 · π0: A Vision-Language-Action Flow Model for General Robot Control

[R03] Black K, Brown N, Driess D, et al.. π0: A Vision-Language-Action Flow Model for General Robot Control[EB/OL]. 2024 / 修订 2026. [2026-10-18]. https://arxiv.org/abs/2410.24164v4

- 原文定位：arXiv:2410.24164v4；2024 首发，2026 修订；RSS 2025

- 支持范围：支持视觉语言骨干与连续动作生成的研究；不外推为任意家庭都适用。

- 类型：论文

## R04 · SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics

[R04] Shukor M, Aubakirova D, Capuano F, et al.. SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics[EB/OL]. 2025. [2026-10-18]. https://arxiv.org/abs/2506.01844

- 原文定位：arXiv:2506.01844；摘要与方法

- 支持范围：讨论紧凑 VLA、社区数据与异步推理；硬件条件需逐项核对。

- 类型：论文

## R05 · Diffusion Policy: Visuomotor Policy Learning via Action Diffusion

[R05] Chi C, Feng S, Du Y, et al.. Diffusion Policy: Visuomotor Policy Learning via Action Diffusion[EB/OL]. 2023. [2026-10-18]. https://arxiv.org/abs/2303.04137

- 原文定位：arXiv:2303.04137；方法

- 支持范围：动作扩散与视觉运动策略的对照学习入口，不把所有该类方法等同于 VLA。

- 类型：论文

## R06 · Open X-Embodiment: Robotic Learning Datasets and RT-X Models

[R06] Open X-Embodiment Collaboration, et al.. Open X-Embodiment: Robotic Learning Datasets and RT-X Models[EB/OL]. 2023 / 修订 2025. [2026-10-18]. https://arxiv.org/abs/2310.08864v9

- 原文定位：arXiv:2310.08864v9；数据与跨机器人迁移

- 支持范围：支持跨机构数据汇聚与迁移研究；不同数据集条件仍不同。

- 类型：论文 / 数据

## R07 · LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning

[R07] Liu B, Zhu Y, Gao C, et al.. LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning[EB/OL]. 2023. [2026-10-18]. https://arxiv.org/abs/2306.03310

- 原文定位：arXiv:2306.03310；任务套件与实验

- 支持范围：支持用受控任务考察知识迁移；仿真成绩不等于实物成功率。

- 类型：论文 / 基准

## R08 · OpenVLA 项目页与对照演示

[R08] OpenVLA 项目作者. OpenVLA 项目页与对照演示[EB/OL]. 2024 项目；2026-10-18 核查. [2026-10-18]. https://openvla.github.io/

- 原文定位：The OpenVLA Model / Experiments / Fine-Tuning

- 支持范围：支持作者发表时机构、模型结构及“不同任务表现有条件”的案例。

- 类型：官方项目页

## R09 · OpenVLA 官方代码仓库

[R09] OpenVLA 社区. OpenVLA 官方代码仓库[EB/OL]. 2026-10-18 核查. [2026-10-18]. https://github.com/openvla/openvla

- 原文定位：README：安装、模型使用与微调

- 支持范围：用于查代码、检查输入输出和适配要求；本样本未运行该模型。

- 类型：官方仓库

## R10 · openpi 官方代码仓库

[R10] Physical Intelligence. openpi 官方代码仓库[EB/OL]. 2026-10-18 核查. [2026-10-18]. https://github.com/Physical-Intelligence/openpi

- 原文定位：README：策略、模型与示例

- 支持范围：连接研究策略与工程代码；每个 checkpoint 的条件需另查。

- 类型：官方仓库

## R11 · SmolVLA 官方技术介绍

[R11] Hugging Face / SmolVLA 作者. SmolVLA 官方技术介绍[EB/OL]. 2025；2026-10-18 核查. [2026-10-18]. https://huggingface.co/blog/smolvla

- 原文定位：架构、社区数据与异步推理部分

- 支持范围：与 R04 交叉阅读；不直接把作者的性能宣传写成本组结论。

- 类型：官方技术说明

## R12 · LeRobot 官方仓库

[R12] Hugging Face / LeRobot 社区. LeRobot 官方仓库[EB/OL]. 2026-10-18 核查. [2026-10-18]. https://github.com/huggingface/lerobot

- 原文定位：README 与配套文档

- 支持范围：数据记录、训练与硬件接口的工程入口；不是机器人自动获得通用能力的保证。

- 类型：官方仓库

## R13 · SO-101 硬件与配置文档

[R13] Hugging Face / SO-101 文档贡献者. SO-101 硬件与配置文档[EB/OL]. 2026-10-18 核查. [2026-10-18]. https://huggingface.co/docs/lerobot/so101

- 原文定位：组装、校准与配置

- 支持范围：用于理解低成本机械臂实验条件；没有询价或采购建议。

- 类型：官方文档

## R14 · ROS 2 Actions

[R14] ROS 2 设计社区. ROS 2 Actions[EB/OL]. 2020 修订；2026-10-18 核查. [2026-10-18]. https://design.ros2.org/articles/actions.html

- 原文定位：Background / Action interface

- 支持范围：解释长任务的目标、反馈、结果和取消；不把 Action 通信机制等同于 VLA 动作。

- 类型：官方设计文档

## R15 · MoveIt: Motion Planning

[R15] MoveIt 项目文档贡献者. MoveIt: Motion Planning[EB/OL]. Rolling 文档；2026-10-18 核查. [2026-10-18]. https://moveit.picknik.ai/main/doc/concepts/motion_planning.html

- 原文定位：Motion Plan Request / Result / OMPL

- 支持范围：支持规划、碰撞检查与约束概念；不是对实物绝对安全的认证。

- 类型：官方文档

## R16 · Modern Robotics: Mechanics, Planning, and Control

[R16] Lynch K M, Park F C. Modern Robotics: Mechanics, Planning, and Control[EB/OL]. 2017. [2026-10-18]. https://modernrobotics.northwestern.edu/nu-gm-book-resource/

- 原文定位：第 2–6 章：空间、变换、运动学；第 9 章轨迹

- 支持范围：真实学习入口；与本校课程的对应尚未核实。

- 类型：教材 / 视频

## R17 · 6.4210 Robotic Manipulation

[R17] MIT OpenCourseWare / Russ Tedrake. 6.4210 Robotic Manipulation[EB/OL]. Fall 2022. [2026-10-18]. https://ocw.mit.edu/courses/6-4210-robotic-manipulation-fall-2022/

- 原文定位：课程介绍与课程材料

- 支持范围：用于后续机器人操作学习；不是本作业的先修要求。

- 类型：真实课程

## R18 · CS106A: Programming Methodology 归档课程大纲

[R18] Stanford / CS106A 教学团队. CS106A: Programming Methodology 归档课程大纲[EB/OL]. 归档大纲；2026-10-18 核查. [2026-10-18]. https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1224/handouts_w2021/syllabus-cs106a.html

- 原文定位：Topics：Python、函数、字典、文件、调试

- 支持范围：提供代码与日志处理基础；不是本校必修课的证明。

- 类型：真实课程

## R19 · Conference on Robot Learning：会议入口

[R19] Robot Learning Foundation. Conference on Robot Learning：会议入口[EB/OL]. 2026-10-18 核查. [2026-10-18]. https://www.robot-learning.org/

- 原文定位：CoRL 与历史会议页面

- 支持范围：跟踪机器人学习研究；不在未核查目录正文时自行宣称 CCF 等级。

- 类型：官方会议入口

## R20 · 课程大作业：三张活地图

[R20] 教师提供的作业要求. 课程大作业：三张活地图[EB/OL]. 用户提供；2026-10-18 整理. [2026-10-18]. assignment.txt

- 原文定位：领域、生态、认知与技术实现各节

- 支持范围：直接支持课程关联、事实核实、公开访问、更新和真实互评要求。

- 类型：作业原文

## R21 · Introduction to Information Retrieval: Naive Bayes text classification

[R21] Manning C D, Raghavan P, Schütze H. Introduction to Information Retrieval: Naive Bayes text classification[EB/OL]. 2008 教材. [2026-10-18]. https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html

- 原文定位：第 13 章，多项式朴素贝叶斯

- 支持范围：本网站地图助手的轻量意图分类依据；不是机器人控制策略。

- 类型：算法教材

## R22 · 推荐目录 2022 更名版公告

[R22] 中国计算机学会. 推荐目录 2022 更名版公告[EB/OL]. 2024-06-28. [2026-10-18]. https://www.ccf.org.cn/Academic_Evaluation/By_category/2024-06-28/825349.shtml

- 原文定位：目录版本入口；正文未完整读取

- 支持范围：保留具体会议类别待核实，不将会议声誉代替工作质量。

- 类型：官方目录入口

AI 使用说明：AI 辅助整理结构、解释、来源与网页实现；事实依据来自所列原文。学生理解、学校信息、实践、反馈与长期维护需小组亲自完成。
